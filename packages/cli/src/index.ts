/* eslint-disable jsdoc/require-jsdoc */
import { red, reset, yellow } from 'kolorist';
import minimist from 'minimist';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';

const argv = minimist<{
  t?: string;
  template?: string;
}>(process.argv.slice(2), { string: ['_'] });
const cwd = process.cwd();

const renameFiles: Record<string, string | undefined> = {};

const defaultTargetDir = 'g6-extension-test';

const TEMPLATES = [
  {
    name: 'extension',
    display: 'Extension',
    color: yellow,
  },
];

const TEMPLATE_NAMES = TEMPLATES.map((template) => template.name);

async function init() {
  const argTargetDir = formatTargetDir(argv._[0]);
  const argTemplate = argv.template || argv.t;

  let targetDir = argTargetDir || defaultTargetDir;
  const getProjectName = () => (targetDir === '.' ? path.basename(path.resolve()) : targetDir);

  let result: prompts.Answers<'template' | 'projectName' | 'overwrite' | 'author'>;

  prompts.override({
    overwrite: argv.overwrite,
  });

  try {
    result = await prompts(
      [
        {
          type: argTemplate && TEMPLATE_NAMES.includes(argTemplate) ? null : 'select',
          name: 'template',
          message:
            typeof argTemplate === 'string' && !TEMPLATE_NAMES.includes(argTemplate)
              ? reset(`"${argTemplate}" isn't a valid template. Please choose from below: `)
              : reset('Select a template:'),
          initial: 0,
          choices: TEMPLATES.map((template) => {
            const templateColor = template.color;
            return {
              title: templateColor(template.display || template.name),
              value: template,
            };
          }),
        },
        {
          type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'select'),
          name: 'overwrite',
          message: () =>
            (targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`) +
            ` is not empty. Please choose how to proceed:`,
          initial: 0,
          choices: [
            {
              title: 'Remove existing files and continue',
              value: 'yes',
            },
            {
              title: 'Cancel operation',
              value: 'no',
            },
            {
              title: 'Ignore files and continue',
              value: 'ignore',
            },
          ],
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === 'no') {
              throw new Error(red('✖') + ' Operation cancelled');
            }
            return null;
          },
          name: 'overwriteChecker',
        },
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir;
          },
        },
        {
          type: 'text',
          name: 'author',
          message: reset('Author'),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        },
      },
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  // user choice associated with prompts
  const { template, overwrite, projectName = getProjectName(), author } = result;

  const variables = {
    '{{projectName}}': projectName,
  };

  const root = path.join(cwd, targetDir);

  if (overwrite === 'yes') {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);

  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

  console.log(`\nScaffolding project in ${root}...`);

  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../..', `template-${template.name}`);

  const write = (file: string, variables: Record<string, string>, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath, variables);
    }
  };

  const files = fs.readdirSync(templateDir);

  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file, variables);
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'));

  pkg.name = projectName;
  pkg.author = author;

  write('package.json', variables, JSON.stringify(pkg, null, 2) + '\n');

  const cdProjectName = path.relative(cwd, root);
  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`);
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn');
      console.log('  yarn dev');
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
  console.log();
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '');
}

function copy(src: string, dest: string, variables: Record<string, string>) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest, variables);
  } else {
    const templateContent = fs.readFileSync(src, 'utf-8');
    const content = replaceTemplateVariables(templateContent, variables);
    fs.writeFileSync(dest, content);
  }
}

function copyDir(srcDir: string, destDir: string, variables: Record<string, string>) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile, variables);
  }
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

function replaceTemplateVariables(content: string, variables: Record<string, string>) {
  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(key, 'g');
    content = content.replace(regex, variables[key]);
  });
  return content;
}

init().catch((e) => {
  console.error(e);
});
