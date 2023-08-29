import translate from 'google-translate-api-x';

import fs from 'fs';
import { readFile, readdir, writeFile } from 'node:fs/promises';

/**
 * A workaround
 * because of `readdir` doesn't work with { recursive: true }
 * see : https://github.com/nodejs/node/issues/48858
 */
const Readdir = async (path, options) => {
  const all = await readdir(path);
  const dirs = [];
  const files = [];

  all.forEach((item) => {
    const filePath = path + item;
    const isDir = fs.lstatSync(filePath).isDirectory();
    if (isDir) {
      dirs.push(filePath);
    } else {
      files.push(filePath);
    }
  });

  const secondFiles = [];
  for (let i = 0; i < dirs.length; i++) {
    const filePath = dirs[i];
    if (fs.lstatSync(filePath).isDirectory()) {
      const sfiles = await readdir(filePath);
      const sfilesPath = sfiles.map((c) => {
        return filePath + '/' + c;
      });
      secondFiles.push(...sfilesPath);
    }
  }
  return [...files, ...secondFiles];
};

const translateFile = async (content) => {
  try {
    const res = await translate(content.toString(), { from: 'en', to: 'zh-CN' }).catch((error) => {
      return { text: '' };
    });
    return res;
  } catch (error) {
    return {
      text: '',
    };
  }
};
const DOC_FILE_PATH = 'docs/apis/';
const main = async () => {
  const dirPath = DOC_FILE_PATH;
  // const files = await readdir(dirPath, { recursive: true }); // it is a bug: https://github.com/nodejs/node/issues/48858
  const AllFiles = await Readdir(dirPath, { recursive: true });

  const files = AllFiles.filter((item) => {
    return item.indexOf('.zh-CN.md') === -1;
  });

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    const content = await readFile(file);
    const suffix = file.replace('.md', '.zh-CN.md');
    let hasTranslated = false;
    try {
      hasTranslated = fs.lstatSync(suffix).isFile();
    } catch (error) {}

    if (!hasTranslated) {
      console.log('hasTranslated', hasTranslated, file);
      const res = await translateFile(content);
      writeFile(suffix, res.text);
    }
  }
};

main();
