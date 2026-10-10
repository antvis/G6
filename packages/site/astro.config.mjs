import { defineConfig } from '@antv/astro-theme-antv';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const { version } = JSON.parse(readFileSync(new URL('../g6/package.json', import.meta.url), 'utf8'));

// Product content shared by the Astro theme and homepage slots.
const site = {
  site: {
    title: 'G6',
    metaTitle: {
      zh: 'G6 图可视化引擎',
      en: 'G6 Graph Visualization Framework in JavaScript',
    },
    description: {
      zh: 'G6 是一个简单、易用、完备的图可视化引擎，它在高定制能力的基础上，提供了一系列设计优雅、便于使用的图可视化解决方案。能帮助开发者搭建属于自己的图可视化、图分析、或图编辑器应用。',
      en: 'G6 is a graph visualization framework with simplicity and convenience. Based on the ability of customization, it provides elegant graph visualization solutions, helping developers build applications for graph visualization, analysis, and editing.',
    },
    origin: 'https://g6.antv.antgroup.com',
    repository: 'https://github.com/antvis/G6',
    verification: {
      'google-site-verification': 'D2DFQzn8bn6vTvIqonu0FSFoF-y5ZihUR9WYteGI684',
    },
    favicon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
    logo: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
  content: {
    docs: './docs',
    examples: './examples',
    edit: {
      branch: 'v5',
      path: 'packages/site/docs',
    },
    sidebar: {
      'manual/getting-started': {
        zh: '开始使用',
        en: 'Getting Started',
        order: 2,
      },
      'manual/getting-started/integration': {
        zh: '前端框架集成',
        en: 'Integration',
        order: 2,
      },
      'manual/graph': {
        zh: '图 Graph',
        en: 'Graph',
        order: 3,
      },
      'manual/element': {
        zh: '元素 Element',
        en: 'Element',
        order: 5,
      },
      'manual/element/node': {
        zh: '节点 Node',
        en: 'Node',
        order: 3,
      },
      'manual/element/edge': {
        zh: '边 Edge',
        en: 'Edge',
        order: 4,
      },
      'manual/element/combo': {
        zh: '组合 Combo',
        en: 'Combo',
        order: 5,
      },
      'manual/element/shape': {
        zh: '图形 Shape',
        en: 'Shape',
        order: 6,
      },
      'manual/layout': {
        zh: '布局 Layout',
        en: 'Layout',
        order: 5,
      },
      'manual/behavior': {
        zh: '交互 Behavior',
        en: 'Behavior',
        order: 6,
      },
      'manual/plugin': {
        zh: '插件 Plugin',
        en: 'Plugin',
        order: 7,
      },
      'manual/transform': {
        zh: '数据处理 Transform',
        en: 'Transform',
        order: 8,
      },
      'manual/theme': {
        zh: '主题 Theme',
        en: 'Theme',
        order: 9,
      },
      'manual/animation': {
        zh: '动画 Animation',
        en: 'Animation',
        order: 10,
      },
      'manual/further-reading': {
        zh: '扩展阅读',
        en: 'Further Reading',
        order: 11,
      },
      'manual/whats-new': {
        zh: '版本特性',
        en: "What's new",
        order: 12,
      },
    },
  },
  navigation: [
    {
      text: {
        zh: '文档',
        en: 'Docs',
      },
      href: '/manual/introduction/',
    },
    {
      text: {
        zh: 'API',
        en: 'API',
      },
      href: '/api/data/',
    },
    {
      text: {
        zh: '图表示例',
        en: 'Playground',
      },
      href: '/examples/',
    },
    {
      text: {
        zh: '文章博客',
        en: 'Blog',
      },
      href: 'https://www.yuque.com/antv/g6-blog',
    },
  ],
  versions: {
    [version]: 'https://g6.antv.antgroup.com',
    '4.x': 'https://g6-v4.antv.vision',
    '3.2.x': 'https://g6-v3-2.antv.vision',
  },
  examples: [
    {
      slug: 'feature',
      icon: 'gallery',
      title: {
        zh: '特性',
        en: 'Feature',
      },
    },
    {
      slug: 'scene-case',
      icon: 'gallery',
      title: {
        zh: '场景案例',
        en: 'Scene Case',
      },
    },
    {
      slug: 'layout',
      icon: 'net',
      title: {
        zh: '图布局',
        en: 'Graph Layout',
      },
    },
    {
      slug: 'element',
      icon: 'shape',
      title: {
        zh: '元素',
        en: 'Element',
      },
    },
    {
      slug: 'behavior',
      icon: 'interaction',
      title: {
        zh: '交互',
        en: 'Behavior',
      },
    },
    {
      slug: 'animation',
      icon: 'scatter',
      title: {
        zh: '动画',
        en: 'Animation',
      },
    },
    {
      slug: 'plugin',
      icon: 'tool',
      title: {
        zh: '插件',
        en: 'Plugin',
      },
    },
    {
      slug: 'transform',
      icon: 'tag-flow',
      title: {
        zh: '数据处理',
        en: 'Transform',
      },
    },
    {
      slug: 'algorithm',
      icon: 'gallery',
      title: {
        zh: '算法',
        en: 'Algorithm',
      },
    },
    {
      slug: 'performance',
      icon: 'net',
      title: {
        zh: '性能',
        en: 'Performance',
      },
    },
  ],
  qa: { enabled: true },
  search: {
    enabled: true,
  },
  analytics: {
    GoogleAnalytics: {
      id: 'G-YLQBGDK1GT',
    },
  },
  home: {
    title: {
      zh: '图可视化引擎',
      en: 'Graph Visualization Engine',
    },
    description: {
      zh: 'G6 是一个简单、易用、完备的图可视化引擎，它在高定制能力的基础上，提供了一系列设计优雅、便于使用的图可视化解决方案。能帮助开发者搭建属于自己的图可视化、图分析、或图编辑器应用。',
      en: 'G6 is graph visualization engine with simplicity and convenience. Based on the ability of customize, it provides a set of elegant graph visualization solutions, and helps developers to build up applications for graph visualization, graph analysis, and graph editor.',
    },
    image: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*6dSUSo3QTk0AAAAAAAAAAAAADmJ7AQ/original',
    features: [
      {
        icon: 'https://gw.alipayobjects.com/zos/basement_prod/0e03c123-031b-48ed-9050-4ee18c903e94.svg',
        title: {
          zh: '专注关系，完备基建',
          en: 'Dedicated & Complete',
        },
        description: {
          zh: 'G6 是一个专注于关系数据的、完备的图可视化引擎',
          en: 'G6 is a complete graph visualization engine, which focuses on relational data',
        },
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/basement_prod/42d17359-8607-4227-af93-7509eabb3163.svg',
        title: {
          zh: '领域深钻，顶尖方案',
          en: 'Top Solution',
        },
        description: {
          zh: '扎根实际具体业务场景、结合业界领先成果，沉淀顶尖解决方案',
          en: 'According to practical business scenarios, we found out the top solutions',
        },
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/basement_prod/acd8d1f3-d256-42b7-8340-27e5d5fde92c.svg',
        title: {
          zh: '简单易用，扩展灵活',
          en: 'Simple & Extendable',
        },
        description: {
          zh: 'Vivid, 精心设计的简单、灵活、高可拓展的接口，满足你的无限创意',
          en: 'Well-designed simple, flexible, and extendable interfaces will satisfy your infinite originality',
        },
      },
    ],
  },
  slots: {
    home: {
      hero: ['./src/components/HomeHero.astro'],
      features: ['./src/components/HomeShowcase.astro'],
    },
  },
  demo: {
    height: 500,
    dependencies: {
      '/demo-runtime.ts': './src/demo-runtime.ts',
      '@ant-design/icons': '@ant-design/icons',
      '@antv/algorithm': '@antv/algorithm',
      '@antv/g': '@antv/g',
      '@antv/g-canvas': '@antv/g-canvas',
      '@antv/g-plugin-rough-canvas-renderer': '@antv/g-plugin-rough-canvas-renderer',
      '@antv/g-svg': '@antv/g-svg',
      '@antv/g2': '@antv/g2',
      '@antv/g6': '@antv/g6',
      '@antv/g6-extension-3d': '@antv/g6-extension-3d',
      '@antv/g6-extension-react': '@antv/g6-extension-react',
      '@antv/layout-gpu': '@antv/layout-gpu',
      '@antv/util': '@antv/util',
      '@antv/vendor/d3-hierarchy': '@antv/vendor/d3-hierarchy',
      antd: 'antd',
      react: './src/demo-dependencies/react.js',
      'react-dom/client': './src/demo-dependencies/react-dom-client.js',
      'react/jsx-runtime': './src/demo-dependencies/react-jsx-runtime.js',
      'styled-components': 'styled-components',
      'lil-gui': 'lil-gui',
    },
  },
};

export default {
  ...defineConfig(site),
  devToolbar: { enabled: false },
  vite: {
    optimizeDeps: {
      include: [
        '@antv/astro-theme-antv > sucrase',
        ...Object.keys(site.demo.dependencies).filter((name) => !name.startsWith('/')),
      ],
    },
    resolve: {
      // Exact matches keep extension packages and subpath imports intact.
      alias: [
        ...['g6', 'g6-extension-3d', 'g6-extension-react'].map((name) => ({
          find: new RegExp(`^@antv/${name}$`),
          replacement: fileURLToPath(new URL(`../${name}/src/index.ts`, import.meta.url)),
        })),
        { find: '/demo-runtime.ts', replacement: fileURLToPath(new URL('./src/demo-runtime.ts', import.meta.url)) },
      ],
    },
  },
};
