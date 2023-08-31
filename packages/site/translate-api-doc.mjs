import fs from 'fs';
import fsExtra from 'fs-extra';
import translate from 'google-translate-api-x';
import { readFile, writeFile } from 'node:fs/promises';

/**
 * A workaround
 * because of `readdir` doesn't work with { recursive: true }
 * see : https://github.com/nodejs/node/issues/48858
 */
var walk = (dir) => {
  try {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach((file) => {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        /* Recurse into a subdirectory */
        results = results.concat(walk(file));
      } else {
        /* Is a file */
        results.push(file);
      }
    });
    return results;
  } catch (error) {
    return [];
  }
};

const TEMP_DOC_FILE_PATH = 'docs/_apis';
const DOC_FILE_PATH = 'docs/apis';

let errorMessage = ``;

const main = async () => {
  // if node.js version not equal 18 ,throw error

  const RawFiles = walk(TEMP_DOC_FILE_PATH); //Readdir(TEMP_DOC_FILE_PATH, { recursive: true });
  // const files = await readdir(dirPath, { recursive: true }); // it is a bug: https://github.com/nodejs/node/issues/48858
  const AllFiles = walk(DOC_FILE_PATH, { recursive: true });

  for (let i = 0; i < RawFiles.length; i++) {
    let file = AllFiles[i];
    let rawFile = RawFiles[i];

    const en_path = rawFile.replace('.md', '.en.md').replace(TEMP_DOC_FILE_PATH, DOC_FILE_PATH);
    const zh_path = rawFile.replace('.md', '.zh.md').replace(TEMP_DOC_FILE_PATH, DOC_FILE_PATH);
    let has_en_file = false;
    let has_zh_file = false;

    try {
      has_en_file = fs.lstatSync(en_path).isFile();
      has_zh_file = fs.lstatSync(zh_path).isFile();
    } catch (error) {
      errorMessage = errorMessage + '\n' + error;
    }

    if (has_en_file && has_zh_file) {
      errorMessage = errorMessage + '\n' + `file: ${file} has been translated`;
      console.log(`file: ${file} has been translated`);
      continue;
    }

    const content = await readFile(rawFile);

    const zh_file_name = zh_path.split('/').pop().split('.')[0];
    const en_file_name = en_path.split('/').pop().split('.')[0];

    const zh_header = `---
title: ${zh_file_name}
---

`;
    const en_header = `---
title: ${en_file_name}
---

`;
    const en_content = content.toString().replaceAll('.md', '.en.md');
    const zh_content = content.toString().replaceAll('.md', '.zh.md');

    /** create en_US file */

    await fsExtra.ensureFile(en_path);
    await writeFile(en_path, en_header + en_content);

    let hasTranslated = false;
    try {
      hasTranslated = fs.lstatSync(zh_path).isFile();
    } catch (error) {}

    if (!hasTranslated) {
      const res = await translate(zh_content, { from: 'en', to: 'zh-CN' }).catch((error) => {
        errorMessage = errorMessage + '\n' + `TRANSLATE ERROR: ${file}:${zh_path} \n `;
        return { text: '' };
      });
      writeFile(zh_path, zh_header + res.text);
    }
  }
  fs.writeFileSync('.translate-info.txt', errorMessage);
  // rm('docs/apis/modules.en.md');
  // rm('docs/apis/modules.zh.md');
};

main();
