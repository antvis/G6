import { confirm, intro, isCancel, note, outro, select, spinner, text } from '@clack/prompts';
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const statePath = path.join(repoRoot, '.git', '.contribute-state.json');
const args = process.argv.slice(2);

const ui = {
  divider: chalk.gray('─'.repeat(56)),
};

function showUsage() {
  console.log(`
使用方式：
  node ./scripts/contribute.mjs <GitHub 分支 URL | user:branch> [本地分支名]

示例：
  node ./scripts/contribute.mjs https://github.com/contributor/G6/tree/feature/foo
  node ./scripts/contribute.mjs https://github.com/other/repo/tree/main my-local-branch
  node ./scripts/contribute.mjs user:fix/issue-123 new-branch

提示：
- 支持 user:branch 简写（仓库默认为 G6）
- 如果上一次未正常退出，将在下次运行时提示恢复并清理
`);
}

function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch (error) {
    console.error('获取当前分支时出错:', error);
    process.exit(1);
  }
}

function checkStagingArea() {
  try {
    const status = execSync('git status --porcelain').toString();
    if (status) {
      console.error('请在执行操作前清空暂存区:');
      process.exit(1);
    }
  } catch (error) {
    console.error('检查暂存区时出错:', error);
    process.exit(1);
  }
}

function parseGithubUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch (error) {
    throw new Error('无法解析 GitHub URL');
  }

  if (parsed.hostname !== 'github.com') {
    throw new Error('仅支持 GitHub URL');
  }

  const segments = parsed.pathname.split('/').filter(Boolean);
  // 形如 /{user}/{repo}/tree/{branch...}
  if (segments.length < 4 || segments[2] !== 'tree') {
    throw new Error('URL 格式不正确，示例：https://github.com/user/repo/tree/branch/name');
  }

  const [username, repository, , ...branchParts] = segments;
  const branch = branchParts.join('/');
  if (!branch) {
    throw new Error('未找到分支名');
  }

  return { username, repository, branch };
}

function parseShorthand(input) {
  const [username, branch] = input.split(':');
  if (!username || !branch) {
    throw new Error('格式错误，示例：user:fix/issue');
  }
  return { username, repository: 'G6', branch };
}

function parseInput(input) {
  if (/^https?:\/\//.test(input)) {
    return parseGithubUrl(input);
  }
  return parseShorthand(input);
}

function readState() {
  if (!fs.existsSync(statePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(statePath, 'utf8'));
  } catch (error) {
    console.error(chalk.yellow('无法读取历史状态，将忽略。'));
    return null;
  }
}

function saveState(data) {
  try {
    fs.writeFileSync(statePath, JSON.stringify({ ...data, savedAt: new Date().toISOString() }, null, 2));
  } catch (error) {
    console.error(chalk.yellow('保存状态失败，不影响继续操作，但无法自动恢复。'));
  }
}

function clearState() {
  if (fs.existsSync(statePath)) {
    try {
      fs.unlinkSync(statePath);
    } catch (error) {
      console.error(chalk.yellow('清理状态文件失败，请手动删除 .git/.contribute-state.json'));
    }
  }
}

function remoteExists(name) {
  try {
    execSync(`git remote get-url ${name}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function describeState(state) {
  const items = [
    `${chalk.gray('原分支')} ${chalk.green(state.originalBranch)}`,
    `${chalk.gray('本地分支')} ${chalk.green(state.localBranch)}`,
    `${chalk.gray('远程')} ${chalk.green(`${state.remoteName}/${state.remoteBranch}`)} (${state.repository})`,
  ];
  return items.join('\n');
}

function ensureNotCancelled(value) {
  if (isCancel(value)) {
    outro('已取消');
    process.exit(0);
  }
  return value;
}

function addRemoteAndCheckoutBranch(username, repository, localBranch, remoteBranch) {
  const remoteUrl = `https://github.com/${username}/${repository}.git`;
  const originalBranch = getCurrentBranch();
  const s = spinner();

  try {
    s.start('检查远程源...');
    const remotes = execSync('git remote').toString().split('\n').filter(Boolean);
    if (remotes.includes(username)) {
      const existingUrl = execSync(`git remote get-url ${username}`).toString().trim();
      if (existingUrl !== remoteUrl) {
        throw new Error(`远程源 ${username} 已存在且指向 ${existingUrl}，请确认后重试`);
      }
      s.message(`远程源 ${username} 已存在，跳过添加`);
    } else {
      s.message(`添加远程源: ${remoteUrl}`);
      execSync(`git remote add ${username} ${remoteUrl}`);
    }

    s.message(`获取分支: 本地 ${localBranch} / 远程 ${remoteBranch}`);
    execSync(`git fetch ${username}`);

    let branchExists = false;
    try {
      execSync(`git show-ref --verify --quiet refs/heads/${localBranch}`, { stdio: 'ignore' });
      branchExists = true;
    } catch (error) {
      branchExists = false;
    }

    if (branchExists) {
      s.message(`切换到现有本地分支 ${localBranch}`);
      execSync(`git checkout ${localBranch}`);
    } else {
      s.message(`创建并切换到本地分支 ${localBranch}`);
      execSync(`git checkout -b ${localBranch} ${username}/${remoteBranch}`);
    }

    s.stop(chalk.green('切换成功'));

    saveState({
      originalBranch,
      localBranch,
      remoteBranch,
      repository,
      remoteName: username,
      remoteUrl,
    });

    note(
      `已切换到贡献者分支\n${chalk.gray('原分支')} ${originalBranch}\n${chalk.gray('当前分支')} ${localBranch}\n${chalk.gray('远程')} ${username}/${remoteBranch}`,
      chalk.green('成功'),
    );

    return { originalBranch, localBranch, remoteName: username };
  } catch (error) {
    s.stop(chalk.red('失败'));
    outro(chalk.red(`执行 git 命令时出错: ${error.message || error}`));
    process.exit(1);
  }
}

function recoverSession(state) {
  checkStagingArea();
  const s = spinner();

  try {
    const current = getCurrentBranch();
    if (state.originalBranch && current !== state.originalBranch) {
      s.start(`切回原分支 ${state.originalBranch}...`);
      execSync(`git checkout ${state.originalBranch}`);
      s.stop('已切回原分支');
    }
  } catch (error) {
    s.stop(chalk.red('切换原分支失败'));
    console.error(chalk.yellow(error.message));
  }

  try {
    execSync(`git show-ref --verify --quiet refs/heads/${state.localBranch}`, { stdio: 'ignore' });
    if (state.localBranch !== getCurrentBranch()) {
      s.start(`删除本地分支 ${state.localBranch}...`);
      execSync(`git branch -D ${state.localBranch}`);
      s.stop('已删除本地分支');
    } else {
      note('当前位于待删除分支，已跳过删除，请手动处理。', '提示');
    }
  } catch (error) {
    // branch missing -> skip
  }

  if (state.remoteName && remoteExists(state.remoteName)) {
    try {
      s.start(`移除远程源 ${state.remoteName}...`);
      execSync(`git remote remove ${state.remoteName}`);
      s.stop('已移除远程源');
    } catch (error) {
      s.stop(chalk.red('移除远程源失败'));
      console.error(chalk.yellow(error.message));
    }
  }

  clearState();
  outro('恢复完成，如需再次切换请重新执行脚本。');
  process.exit(0);
}

async function handleExistingState() {
  const state = readState();
  if (!state) return;

  note(describeState(state), '发现未完成的会话');
  const action = await select({
    message: '选择操作',
    options: [
      { value: 'recover', label: '恢复并清理 (切回原分支、移除本地分支和远程)' },
      { value: 'skip', label: '跳过恢复并继续新的切换 (保留记录)' },
      { value: 'clear', label: '删除记录后继续' },
    ],
    initialValue: 'recover',
  });
  ensureNotCancelled(action);

  if (action === 'recover') {
    recoverSession(state);
  } else if (action === 'clear') {
    clearState();
    note('已删除历史记录', '提示');
  } else {
    note('已跳过恢复，如需清理请稍后再次运行并选择恢复。', '提示');
  }
}

async function main() {
  const positional = args.filter((arg) => arg && !arg.startsWith('-'));
  let providedUrl = positional[0];
  let localBranchFromArg = positional[1];

  if (args.includes('-h') || args.includes('--help')) {
    showUsage();
    return;
  }

  await handleExistingState();

  intro('G6 Contribute 助手');

  if (!providedUrl) {
    const urlInput = await text({
      message: '输入 GitHub 分支 URL 或别名 user:branch',
      placeholder: 'https://github.com/user/repo/tree/feature/foo 或 user:fix/issue',
      validate: (value) => (!value ? '不能为空' : undefined),
    });
    ensureNotCancelled(urlInput);
    providedUrl = (urlInput || '').trim();
  }

  if (!providedUrl) {
    outro('未提供分支信息，已退出。');
    return;
  }

  let parsed;
  try {
    parsed = parseInput(providedUrl.trim());
  } catch (error) {
    outro(chalk.red(error.message));
    process.exit(1);
  }

  const { username, repository, branch } = parsed;

  let localBranch = localBranchFromArg;
  if (!localBranch) {
    const lb = await text({
      message: '输入本地分支名',
      placeholder: branch,
      initialValue: branch,
    });
    ensureNotCancelled(lb);
    localBranch = lb?.trim() || branch;
  }

  note(
    `${chalk.gray('仓库')} ${chalk.green(`${username}/${repository}`)}\n${chalk.gray('远程分支')} ${chalk.green(
      branch,
    )}\n${chalk.gray('本地分支')} ${chalk.green(localBranch)}`,
    '切换预览',
  );
  console.log(ui.divider);

  const confirmed = await confirm({ message: '确认继续执行切换？', active: '是', inactive: '否' });
  ensureNotCancelled(confirmed);
  if (!confirmed) {
    outro('已取消操作');
    return;
  }

  checkStagingArea();

  const { originalBranch, remoteName } = addRemoteAndCheckoutBranch(username, repository, localBranch, branch);

  const cleanupAction = await select({
    message: '完成后的清理选项',
    options: [
      {
        value: 'all',
        label: `${chalk.green('[推荐]')} 移除远程源，移除本地分支并切回到 ${originalBranch}`,
      },
      { value: 'remote', label: '仅移除远程源' },
      { value: 'none', label: '不进行任何操作' },
    ],
    initialValue: 'all',
  });
  ensureNotCancelled(cleanupAction);

  if (cleanupAction === 'remote' || cleanupAction === 'all') {
    try {
      execSync(`git remote remove ${remoteName}`);
      note(`已移除远程源: ${remoteName}`, '清理');
    } catch (error) {
      outro(chalk.red(`移除远程源 ${remoteName} 失败`));
      console.error(error.message || error);
      process.exit(1);
    }
  }

  if (cleanupAction === 'all') {
    try {
      execSync(`git checkout ${originalBranch}`);
      execSync(`git branch -D ${localBranch}`);
      note(`已切回 ${originalBranch} 并删除本地分支 ${localBranch}`, '完成');
    } catch (error) {
      outro(chalk.red('分支清理失败'));
      console.error(error.message || error);
      process.exit(1);
    }
  }

  clearState();
  outro('操作完成');
}

main();
