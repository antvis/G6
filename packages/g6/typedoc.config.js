const path = require('path');
const outputDir = path.resolve(__dirname, '../site/docs/_apis');
console.log('outputDir', outputDir);

module.exports = {
  entryPoints: [
    /** graph */
    'src/api-doc/graph.ts',
    /** plugins */
    'src/api-doc/plugins.ts',
    /** behaviors */
    'src/api-doc/behaviors.ts',
    /** types */
    'src/api-doc/types.ts',
    /** util */
    'src/api-doc/util.ts',

    // 'src/stdlib/plugin/**/*.ts',
  ],
  out: outputDir,
  hideGenerator: true,
  includeVersion: true,
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  plugin: 'typedoc-plugin-markdown',
  hideInPageTOC: true,
  // hideBreadcrumbs: true,
  // hidePageTitle: true,
  theme: 'markdown',
  categoryOrder: ['Plugins', 'Behaviors', '*'],
  groupOrder: ['Variables', 'Functions', 'Interfaces', '*'],
  name: 'Overview',
  readme: 'src/api-doc/readme.md',
  // https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/packages/typedoc-plugin-markdown/src/theme.ts#L31
  filenameSeparator: '-',
};
