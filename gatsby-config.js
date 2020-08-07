const { version, homepage, repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        GATrackingId: 'UA-148148901-4',
      },
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: 'G6',
    description: 'A collection of charts made with the Grammar of Graphics',
    siteUrl: homepage,
    githubUrl: repository.url,
    versions: {
      [version]: 'https://g6.antv.vision',
      '3.2.x': 'https://g6-v3-2.antv.vision',
    },
    navs: [
      {
        slug: 'docs/manual/introduction',
        title: {
          zh: '使用文档',
          en: 'Manual',
        },
      },
      {
        slug: 'docs/api/Graph',
        title: {
          zh: 'API 文档',
          en: 'API',
        },
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
      },
    ],
    docs: [
      {
        slug: 'manual/FAQ',
        title: {
          zh: 'FAQ',
          en: 'FAQ',
        },
        order: 2,
      },
      {
        slug: 'manual/tutorial',
        title: {
          zh: '入门教程',
          en: 'Tutorial',
        },
        order: 3,
      },
      {
        slug: 'manual/middle',
        title: {
          zh: '核心概念',
          en: 'Middle',
        },
        order: 4,
      },
      {
        slug: 'manual/middle/states',
        title: {
          zh: '交互与事件',
          en: 'Behavior & Event',
        },
        order: 4,
      },
      {
        slug: 'manual/middle/elements',
        title: {
          zh: '节点/边/Combo',
          en: 'Graph Elements',
        },
      },
      {
        slug: 'manual/middle/elements/nodes',
        title: {
          zh: '内置节点',
          en: 'Built-in Node',
        },
        order: 1,
      },
      {
        slug: 'manual/middle/elements/edges',
        title: {
          zh: '内置边',
          en: 'Built-in Edge',
        },
        order: 2,
      },
      {
        slug: 'manual/middle/elements/combos',
        title: {
          zh: '内置 Combo',
          en: 'Built-in Combo',
        },
        order: 3,
      },
      {
        slug: 'manual/advanced',
        title: {
          zh: '高级指引',
          en: 'Advanced',
        },
        order: 5,
      },
      {
        slug: 'manual/advanced/keyconcept',
        title: {
          zh: '概念解释',
          en: 'Concepts',
        },
        order: 0,
      },
      {
        slug: 'manual/advanced/theory',
        title: {
          zh: '深度原理解析',
          en: 'Theory Blog',
        },
        order: 1,
      },
      {
        slug: 'api/nodeEdge',
        title: {
          zh: '节点/边/Combo',
          en: 'Node & Edge & Combo',
        },
        order: 3,
      },
      {
        slug: 'api/layout',
        title: {
          zh: 'Layout',
          en: 'Layout',
        },
        order: 4,
      },
    ],
    examples: [
      {
        slug: 'tree',
        icon: 'tree', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '树图',
          en: 'Tree Graph',
        },
      },
      {
        slug: 'net',
        icon: 'net',
        title: {
          zh: '一般图',
          en: 'General Graph',
        },
      },
      {
        slug: 'graphql',
        icon: 'graphql',
        title: {
          zh: '其他表达形式',
          en: 'Net Charts',
        },
      },
      {
        slug: 'item',
        icon: 'shape',
        title: {
          zh: '元素',
          en: 'Item',
        },
      },
      {
        slug: 'interaction',
        icon: 'interaction',
        title: {
          zh: '交互',
          en: 'Interaction',
        },
      },
      {
        slug: 'scatter',
        icon: 'scatter',
        title: {
          zh: '动画',
          en: 'Animation',
        },
      },
      {
        slug: 'tool',
        icon: 'tool',
        title: {
          zh: '组件',
          en: 'Component',
        },
      },
      {
        slug: 'case',
        icon: 'case',
        title: {
          zh: '复杂案例',
          en: 'Case',
        },
      },
      {
        slug: 'performance',
        icon: 'net',
        title: {
          zh: '性能测试',
          en: 'Performance'
        }
      }
    ],
    docsearchOptions: {
      apiKey: '9d1cd586972bb492b7b41b13a949ef30',
      indexName: 'antv_g6',
    },
  },
};
