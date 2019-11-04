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
          zh: '使用文档',
          en: 'docs'
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
        slug: 'manual/advanced',
        title: {
          zh: '进阶',
          en: 'Advanced'
        },
        order: 3
      },
      {
        slug: 'manual/advanced/nodeEdge',
        title: {
          zh: '节点与边',
          en: 'Tutorial'
        },
        order: 2
      }
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
