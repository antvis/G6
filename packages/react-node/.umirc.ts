import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'G6 React Node',
  favicon:
    'https://gw.alipayobjects.com/zos/antfincdn/cfg5jFqgVt/DiceGraph.png',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/cfg5jFqgVt/DiceGraph.png',
  outputPath: 'docs',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  resolve: { includes: ['doc', 'src'] },
  dynamicImport: {
    loading: '@/Loading',
  },
  // more config: https://d.umijs.org/config
});
