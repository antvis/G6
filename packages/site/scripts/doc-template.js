/**
 * @description 在当前目录下创建中英文文档模板
 * @param {string} path - 文件路径，指定为 $PWD
 * @param {string} title - 文件标题
 * @param {string} order - 文件排序[可选]
 * @example npm run add-doc $PWD overview
 */
import chalk from 'chalk';
import { existsSync, writeFileSync } from 'fs';

const [path, title, order] = process.argv.slice(2);

if (!path || !title) {
  console.log(chalk.bold(chalk.green('Example:')), chalk.greenBright('npm run add-doc $PWD overview'));
} else {
  const zhPath = `${path}/${title}.zh.md`;
  const enPath = `${path}/${title}.en.md`;

  const content =
    '---\n' +
    Object.entries({ title, order })
      .filter(([, v]) => !!v)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n') +
    '\n---';

  if (!existsSync(zhPath) && !existsSync(enPath)) {
    writeFileSync(zhPath, content);
    writeFileSync(enPath, content);
  } else console.log(chalk.bold(chalk.red('Error:')), chalk.redBright('File already exists!'));

  console.log(chalk.bold(chalk.green('Success:')), chalk.greenBright('Create doc file successfully!'));
}
