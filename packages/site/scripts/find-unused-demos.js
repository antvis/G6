const fs = require('fs');
const path = require('path');

async function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file === 'demo') {
        readMetaAndFiles(fullPath);
      }
      await traverseDirectory(fullPath);
    }
  }
}

// 定义一个函数来读取 meta.json 文件和目录中的所有文件名
function readMetaAndFiles(dir) {
  try {
    const metaPath = path.join(dir, 'meta.json');
    const metaExists = fs.existsSync(metaPath);

    const files = fs.readdirSync(dir).filter((file) => file !== 'meta.json');

    if (metaExists) {
      // 读取并打印 meta.json 内容
      const metaData = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

      const filenameInMeta = metaData.demos.map((demo) => demo.filename);

      // 找出 meta.json 中没有的文件

      const unusedFiles = files.filter((file) => !filenameInMeta.includes(file));

      unusedFiles.forEach((name) => {
        console.log(path.join(dir, name));
      });
    }
  } catch (error) {}
}

// 开始遍历给定的目录
const startDirectory = 'examples'; // 替换为你的目录路径
traverseDirectory(startDirectory).then(() => console.log('Traversal complete.'));
