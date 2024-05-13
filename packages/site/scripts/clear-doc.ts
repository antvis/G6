import fs from 'fs';
import path from 'path';

/**
 * <zh/> 清理自动生成的文档
 *
 * <en/> Clear the auto-generated documents
 */
function clear() {
  const baseDir = path.resolve(__dirname, '../docs/api');

  // read gitignore
  const gitignore = fs.readFileSync(path.resolve(baseDir, '.gitignore'), 'utf-8');

  // clear all files list in .gitignore
  const lines = gitignore.split('\n');

  lines.forEach((line) => {
    if (!line || line.startsWith('#')) return;

    const file = line.trim();
    if (file) {
      const filepath = path.join(baseDir, file);

      if (fs.existsSync(filepath)) {
        if (fs.lstatSync(filepath).isDirectory()) {
          console.log('Clearing folder: ', filepath);
          fs.rmdirSync(filepath, { recursive: true });
        } else {
          console.log('Clearing file: ', filepath);
          fs.unlinkSync(filepath);
        }
      }
    }
  });

  // remove .gitignore
  fs.unlinkSync('docs/api/.gitignore');
}

clear();
