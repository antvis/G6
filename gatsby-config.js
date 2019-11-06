const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        GATrackingId: 'UA-148148901-4',
        pathPrefix: '/G6'
      }
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: 'G6',
    description: 'A collection of charts made with the Grammar of Graphics',
    githubUrl: repository.url,
    navs: [
      {
        slug: 'docs/manual',
        title: {
          zh: '使用教程',
          en: 'Tutorial'
        }
      },
      {
        slug: 'docs/api/Item',
        title: {
          zh: 'API 文档',
          en: 'API'
        }
      },
      {
        slug: 'examples',
        title: {
          zh: '图表演示',
          en: 'Examples'
        }
      }
    ],
    docs: [
      {
        slug: 'manual/tutorial',
        title: {
          zh: '入门教程',
          en: 'Tutorial'
        },
        order: 2
      },
      {
        slug: 'manual/middle',
        title: {
          zh: '中级教程',
          en: 'Middle'
        },
        order: 3
      },
      {
        slug: 'manual/middle/states',
        title: {
          zh: '交互与事件',
          en: 'Behavior & Event'
        },
        order: 3
      },
      {
        slug: 'manual/middle/elements',
        title: {
          zh: '节点与边',
          en: 'Graph Element'
        }
      },
      {
        slug: 'manual/middle/elements/nodes',
        title: {
          zh: '内置节点类型',
          en: 'Default Node'
        },
        order: 2
      },
      {
        slug: 'manual/middle/elements/edges',
        title: {
          zh: '内置边类型',
          en: 'Default Edge'
        },
        order: 3
      },
      {
        slug: 'manual/advanced',
        title: {
          zh: '高级教程',
          en: 'Advanced'
        },
        order: 4
      },
      {
        slug: 'api',
        title: {
          zh: 'API 文档',
          en: 'API Doc'
        }
      },
      {
        slug: 'api/nodeEdge',
        title: {
          zh: '节点和边',
          en: 'Node & Edge'
        }
      }
      // {
      //   slug: 'manual/advanced/nodeEdge',
      //   title: {
      //     zh: '节点与边',
      //     en: 'Tutorial'
      //   },
      //   order: 2
      // }
    ],
    examples: [
      {
        slug: 'tree',
        icon: 'tree', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '树图',
          en: 'Tree Charts'
        }
      },
      {
        slug: 'net',
        icon: 'net',
        title: {
          zh: '一般图',
          en: 'Net Charts'
        }
      },
      {
        slug: 'graphql',
        icon: 'graphql',
        title: {
          zh: '其他表达形式',
          en: 'Net Charts'
        }
      },
      {
        slug: 'shape',
        icon: 'shape',
        title: {
          zh: '元素',
          en: 'Shape'
        }
      },
      {
        slug: 'interaction',
        icon: 'interaction',
        title: {
          zh: '交互',
          en: 'Interaction'
        }
      },
      {
        slug: 'scatter',
        icon: 'scatter',
        title: {
          zh: '动画',
          en: 'Scatter'
        }
      },
      {
        slug: 'tool',
        icon: 'tool',
        title: {
          zh: '辅助工具',
          en: 'Tool'
        }
      },
      {
        slug: 'case',
        icon: 'case',
        title: {
          zh: '复杂案例',
          en: 'Case'
        }
      }
    ]
  }
};
