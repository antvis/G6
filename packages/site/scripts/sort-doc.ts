/**
 * <zh/> 对目录下的文档进行排序
 *
 * <en/> Sort the documents in the specific directory
 */

import chalk from 'chalk';
import fs from 'fs';
import readline from 'readline';

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.emitKeypressEvents(process.stdin);

const [path] = process.argv.slice(2);

if (!path) {
  console.log('Example: ts-node sort-doc.ts $PWD');
  process.exit(1);
}

const orderRegex = /order: ([\d]+)/;

/**
 * Get the order of the file
 * @param file file path
 * @returns order
 */
function getOrder(file: string) {
  const content = fs.readFileSync(file, 'utf-8');
  const match = content.match(orderRegex);
  if (match) {
    return parseInt(match[1]);
  }
  return 0;
}

// order, name
const docs: [number, string][] = [];

/**
 * Sort the docs
 */
function sortDocs() {
  // list all files in the directory
  const files = fs.readdirSync(path);

  files.forEach((filename) => {
    const name = filename.split('.')[0];
    const index = docs.findIndex(([, _]) => _.startsWith(name));
    if (index === -1) {
      const order = getOrder(`${path}/${filename}`);
      docs.push([order, name]);
    }
  });
  docs.sort(([a], [b]) => a - b);

  printDocs();
}

let currentLine = 0;

/**
 * Print the docs
 */
function printDocs() {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

  docs.forEach(([, name], index) => {
    if (index === currentLine) console.log(`> [${index}] ${name}`);
    else console.log(`  [${index}] ${name}`);
  });

  console.log(chalk.greenBright('Press ↑/↓ to move, Press alt + ↑/↓ to swap, Press Ctrl + C to exit'));
  console.log(chalk.green('Enter ' + chalk.bold('y') + ' to apply sorted order'));
}

/**
 * Handle keypress event
 */
function onKeypress() {
  process.stdin.on('keypress', (ch, key) => {
    if (!key) return;
    if (key.meta && (key.name === 'up' || key.name === 'down')) {
      const swapLine = key.name === 'up' ? currentLine - 1 : currentLine + 1;
      if (swapLine >= 0 && swapLine < docs.length) {
        const temp = docs[currentLine];
        docs[currentLine] = docs[swapLine];
        docs[swapLine] = temp;
        currentLine = swapLine;
      }
      printDocs();
    } else if (key.name === 'up') {
      currentLine = (currentLine - 1 + docs.length) % docs.length;
      printDocs();
    } else if (key.name === 'down') {
      currentLine = (currentLine + 1) % docs.length;
      printDocs();
    } else if (key.ctrl && key.name === 'c') {
      process.exit();
    }
  });
}

sortDocs();
onKeypress();

rl.on('line', (input) => {
  if (input === 'y') {
    docs.forEach(([order, name], index) => {
      ['zh', 'en'].forEach((lang) => {
        const filename = `${path}/${name}.${lang}.md`;
        if (!fs.existsSync(filename)) return;
        let content = fs.readFileSync(filename, 'utf-8');

        if (content.match(orderRegex)) {
          content = content.replace(orderRegex, `order: ${index}`);
        } else {
          // append order into meta info
          const metaRegex = /---\n([\s\S]+?)\n---/;
          const match = content.match(metaRegex);
          let meta = match?.[1] || '';

          if (meta) meta += `\norder: ${index}`;
          else meta = `order: ${index}`;

          content = content.replace(metaRegex, `---\n${meta}\n---`);
        }

        fs.writeFileSync(filename, content, 'utf-8');
      });
    });
    console.log('Saved');
    process.exit();
  }
});
