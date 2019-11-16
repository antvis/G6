const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        GATrackingId: 'UA-148148901-4',
        pathPrefix: '/g6'
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
          zh: '文档',
          en: 'Docs'
        }
      },
      {
        slug: 'docs/api/GlobalAPI',
        title: {
          zh: 'API',
          en: 'API'
        }
      },
      {
        slug: 'examples/tree/compactBox',
        title: {
          zh: '图表演示',
          en: 'Examples'
        }
      }
    ],
    docs: [
      {
        slug: 'manual/FAQ',
        title: {
          zh: 'FAQ',
          en: 'FAQ'
        },
        order: 2
      },
      {
        slug: 'manual/tutorial',
        title: {
          zh: '入门教程',
          en: 'Tutorial'
        },
        order: 3
      },
      {
        slug: 'manual/middle',
        title: {
          zh: '核心概念',
          en: 'Middle'
        },
        order: 4
      },
      {
        slug: 'manual/middle/states',
        title: {
          zh: '交互与事件',
          en: 'Behavior & Event'
        },
        order: 4
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
          zh: '高级指引',
          en: 'Advanced'
        },
        order: 4
      },
      {
        slug: 'manual/cases',
        title: {
          zh: '综合应用',
          en: 'Cases'
        },
        order: 5
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
        },
        order: 4
      },
      {
        slug: 'api/properties',
        title: {
          zh: '属性配置项',
          en: 'Properties'
        },
        order: 10
      }
    ],
    examples: [
      {
        slug: 'tree',
        icon: 'tree', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '树图',
          en: 'Tree Graph'
        }
      },
      {
        slug: 'net',
        icon: 'net',
        title: {
          zh: '一般图',
          en: 'General Graph'
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
          en: 'Animation'
        }
      },
      {
        slug: 'tool',
        icon: 'tool',
        title: {
          zh: '组件',
          en: 'Component'
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
