const fs = require('fs');
const path = require('path');

let entry = ['./src/index.ts'];

const extenders = fs.readdirSync(path.join(__dirname, './src/extends'));
extenders.forEach((name) => {
  entry.push(`./src/extends/${name}/index.ts`);
})

export default {
  entry,
  esm: 'babel',
  cjs: 'babel',
};
