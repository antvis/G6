/* eslint-disable jsdoc/require-jsdoc */
import { readFileSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import path from 'path';
import prettier from 'prettier';

const outputFolder = './docs/apis/reference';

const translationRules = [
  ['抽象类', 'Abstract Classes'],
  ['类', 'Classes'],
  ['方法', 'Functions'],
  ['接口', 'Interfaces'],
  ['命名空间', 'Namespaces'],
  ['变量', 'Variables'],
  ['类型别名', 'Type Aliases'],
  ['参数', 'Parameters'],
  ['构造函数', 'Constructors'],
  ['属性', 'Properties'],
  ['方法', 'Methods'],
  ['可选', 'Optional'],
  ['签名如下：', 'Signature:'],
  ['备注', 'Remarks'],
  ['当前位置', 'Current Location'],
  ['可参考', 'References'],
  ['继承自', 'Extends'],
  ['返回值', 'Returns'],
  ['示例', 'Example'],
];

const inlineTranslationRules = [
  ['抽象类', 'Abstract Class'],
  ['类', 'Class'],
  ['方法', 'Function'],
  ['接口', 'Interface'],
  ['命名空间', 'Namespace'],
  ['变量', 'Variable'],
  ['类型别名', 'Type Alias'],
  ['方法', 'Method'],
  ['参数', 'Parameter'],
  ['属性', 'Property'],
  ['类型', 'Type'],
  ['描述', 'Description'],
  ['修饰符', 'Modifiers'],
  ['构造函数', 'Constructor'],
];

const formatContent = (content: string, lang: 'en' | 'zh') => {
  let formattedContent = content;

  // Step 1. extract content according to lang
  formattedContent = content
    /**
     * @example
     * `[Home](./index.md) &gt; [@antv/g6](./g6.en.md)` => `Current Location: [@antv/g6](./g6.en.md)`
     */
    .replace('[Home](./index.md) &gt;', 'Current Location:')
    /**
     * @example
     * ```
     * <zh/> 描述
     *
     * <en/> description
     * ```
     * => `描述` | `description`
     */
    .replace(/<zh\/>([^\\|]*?)[\\|\n ]*<en\/>([^*|\n#]*)/g, lang === 'en' ? '$2' : '$1')
    /**
     * @example
     * `./index.md` => `./index.zh.md` | `./index.en.md`
     */
    .replace(/(\[[\S ]*?\]\([\S]*)(.md\))/g, `$1.${lang}$2`);

  if (lang === 'zh') {
    translationRules.forEach(([zh, en]) => {
      formattedContent = formattedContent.replace(new RegExp(en, 'g'), zh);
    });
    inlineTranslationRules.forEach(([zh, en]) => {
      formattedContent = formattedContent
        /**
         * @example
         * `| Variable  |` => `| 变量名 |`
         */
        .replace(new RegExp(`(\\|[\\s]*)${en}([\\s]*\\|)`, 'g'), `$1${zh}$2`)
        /**
         * @example
         * `## a variable` => `## 变量 a`
         */
        .replace(new RegExp(`(##)([\\S ]*)${en.toLocaleLowerCase()}`, 'g'), `$1 ${zh}$2`);
    });
  }

  // Step 2. Customize doc title
  /**
   * @example
   * `[@antv/g6](./g6.zh.md) &gt; [Util](./g6.util.zh.md)` => `Util`
   */
  const title = formattedContent
    .split('##')[0]
    .match(/\[(.*?)\]/g)!
    .pop()!
    .replace(/\[|\]/g, '');
  const docWithCustomTitle = `---
  title: '${title}'
  ---
  ${formattedContent}`;

  // Step 3. format markdown by prettier
  return prettier.format(docWithCustomTitle, { parser: 'markdown' });
};

async function run() {
  readdirSync(outputFolder).forEach(async (file) => {
    if (file.endsWith('.md') && !file.endsWith('.zh.md') && !file.endsWith('.en.md')) {
      const filePath = path.join(outputFolder, file);
      const content = readFileSync(filePath, 'utf8');
      const enContent = formatContent(content, 'en');
      const zhContent = formatContent(content, 'zh');
      const baseFilename = path.basename(file, '.md');
      writeFileSync(path.join(outputFolder, baseFilename + '.en.md'), await enContent);
      writeFileSync(path.join(outputFolder, baseFilename + '.zh.md'), await zhContent);
      unlinkSync(filePath);
    }
  });
}

run();
