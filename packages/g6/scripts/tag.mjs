import chalk from 'chalk';
import { execFileSync } from 'child_process';
import { readFileSync } from 'fs';
import open from 'open';
import readline from 'readline';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = pkg.version;
const repository = pkg.repository.url;

console.log(chalk.yellow('The tag will be created with the version: '), chalk.bold(chalk.green(version)));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Do you want to continue? (y/n): ', (answer) => {
  if (answer === 'y') {
    execFileSync('git', ['tag', version]);
    execFileSync('git', ['push', 'origin', version]);
    open(`${repository}/releases/new`);
  }
  rl.close();
});
