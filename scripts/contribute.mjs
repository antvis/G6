import chalk from 'chalk';
import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
  const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/tree\/([^/]+)(\/(.+))*/;
  const match = url.match(regex);
  if (!match) {
    throw new Error('无法解析 GitHub URL');
  }
  const [, username, repository, ...branch] = match;
  return { username, repository, branch: branch.filter(Boolean).join('/') };
}

function addRemoteAndCheckoutBranch(username, localBranch, remoteBranch) {
  const remoteUrl = `https://github.com/${username}/G6.git`;
  const originalBranch = getCurrentBranch();

  try {
    console.log(`添加远程源: ${remoteUrl}`);
    execSync(`git remote add ${username} ${remoteUrl}`);
    console.log(`获取分支: ${localBranch}(本地) / ${remoteBranch}(远程)`);
    execSync(`git fetch ${username}`);
    console.log(`切换到本地分支: ${localBranch}`);
    execSync(`git checkout -b ${localBranch} ${username}/${remoteBranch}`);
    console.log(`成功切换到分支: ${localBranch}`);
  } catch (error) {
    console.error('执行 git 命令时出错:', error);
    process.exit(1);
  }

  console.log(chalk.bold(chalk.green('已切换到贡献者所在分支')));

  rl.question(
    `请在完成后执行下一步操作：
0 - [${chalk.green('推荐')}]移除远程源，${chalk.underline(chalk.red('移除当前分支'))}并切回到 ${chalk.underline(originalBranch)} 分支
1 - 仅移除远程源
2 - 不进行任何操作
`,
    (answer) => {
      if (answer === '2') {
        rl.close();
        return;
      }

      if (['', '1', '0'].includes(answer)) {
        try {
          execSync(`git remote remove ${username}`);
          console.log(`移除远程源: ${username}`);
        } catch (error) {
          console.error('执行 git 命令时出错:', error);
          process.exit(1);
        }
      }

      if (['', '0'].includes(answer)) {
        try {
          execSync(`git checkout ${originalBranch}`);
          execSync(`git branch -D ${localBranch}`);
        } catch (error) {
          console.error('执行 git 命令时出错:', error);
          process.exit(1);
        }
      }

      rl.close();
    },
  );
}

function startAndConfirmInfo() {
  rl.question(
    `请输入 GitHub 分支 URL: \n示例：${chalk.green('https://github.com/contributor/G6/tree/branch/name')}\n> `,
    (url) => {
      const { username, branch } = parseGithubUrl(url);
      console.log(`\n${chalk.red(chalk.bold('即将切换到贡献者所在分支'))}`);
      console.log(`  贡献者: ${chalk.red(username)}`);
      console.log(`  分支: ${chalk.red(branch)}`);
      // 按回车键继续
      rl.question(`\n输入本地分支名: (按回车键继续)\n:`, (modifiedBranch) => {
        addRemoteAndCheckoutBranch(username, modifiedBranch || branch, branch);
      });
    },
  );
}

checkStagingArea();
startAndConfirmInfo();
