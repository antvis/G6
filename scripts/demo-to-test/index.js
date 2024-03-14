/**
 * 为指定路径下的示例添加测试用例
 * @param {string} path demo 路径
 * @param {string} prifix 前缀
 * @param {string} data 数据文件的
 * @example
 * - node scripts/demo-to-test/index net/radialLayout layout radial.json
 * - explain: 为 site/exmples/net/circular 路径下的 demo 示例添加测试文件；layout 为文件名、Fn前缀；circular.json 为数据文件
 */
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const { uniq } = require('lodash');
const { camelToKebab, kebabToCamel, removeFirstAndLastTwoChars } = require('./util');
const { parser, transformSign } = require('./core');
const specTemplate = require('./template/spec');
const testTemplate = require('./template/test');
const itTemplate = require('./template/it');

const args = process.argv.slice(2);
const demoPath = args[0];
const name = camelToKebab(demoPath.split('/').pop());
const prefix = args[1];
const dataFile = args[2];

const prePath = `../../packages/`;
const demoDir = path.resolve(__dirname, prePath, `site/examples/${demoPath}/demo`);
const testDir = path.resolve(__dirname, prePath, `g6/__tests__/demo/case`);
const unitDir = path.resolve(__dirname, prePath, `g6/__tests__/unit/${prefix}s`);
const exportDir = path.resolve(__dirname, prePath, `g6/__tests__/demo/case/index.ts`);

const unitMeta = [];

const formatCode = async (code) => {
  const formattedContent = await prettier.format(code, {
    semi: true,
    singleQuote: true,
    printWidth: 120,
    parser: 'typescript',
  });
  return formattedContent;
};

const initUnit = async () => {
  const unitFiles = fs.readdirSync(unitDir);
  let content = '';
  let imported = '';
  unitMeta.forEach(async (item) => {
    const { kebabName, camelName } = item;
    let exist = !!imported;
    content += exist ? '\n\n' + itTemplate({ kebabName, camelName }) : itTemplate({ kebabName, camelName });
    imported += exist ? ',\n' + camelName : camelName;
    fs.appendFileSync(exportDir, `export * from './${kebabName}';\n`, 'utf-8');
  });
  const filename = `./${prefix}-${name}.spec.ts`;
  if (!unitFiles.includes(filename)) {
    const formattedContent = await formatCode(
      specTemplate({
        content,
        imported,
      }),
    );
    fs.writeFileSync(path.resolve(unitDir, filename), formattedContent, 'utf-8');
  }
};

const initTest = async (dir) => {
  const files = await fs.readdirSync(dir);
  const testFiles = fs.readdirSync(testDir);
  await files.forEach(async (file, index) => {
    const filePath = path.resolve(dir, file);
    const stats = fs.statSync(filePath);
    const kebabName = uniq(`${prefix}-${name}-${camelToKebab(file.replace('.ts', ''))}`.split('-')).join('-');
    const camelName = kebabToCamel(kebabName);
    if (stats.isFile() && file.endsWith('.ts')) {
      unitMeta.push({
        kebabName,
        camelName,
      });
      const { config, success } = parser(filePath);
      if (success) {
        const formattedContent = await formatCode(
          testTemplate({
            config: removeFirstAndLastTwoChars(transformSign(JSON.stringify(config, null, 2))),
            filename: camelName,
            dataFile,
          }),
        );
        if (!testFiles.includes(`${kebabName}.ts`)) {
          fs.writeFileSync(path.resolve(testDir, `./${kebabName}.ts`), formattedContent, 'utf-8');
        }
      }
    }
    if (index === files.length - 1) {
      initUnit();
    }
  });
};

initTest(demoDir);
