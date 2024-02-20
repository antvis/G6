import { defineConfig } from 'dumi';
import { homepage, repository, version } from './package.json';

export default defineConfig({
  locales: [
    { id: 'zh', name: '中文' },
    { id: 'en', name: 'English' },
  ],
  title: 'G6', // 网站header标题
  favicons: ['https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original'], // 网站 favicon
  metas: [
    // 自定义 meta 标签
    { name: 'keywords', content: 'G6' },
    {
      name: 'description',
      content: 'A collection of charts made with the Grammar of Graphics',
    },
  ],
  themeConfig: {
    title: 'G6',
    description: 'A collection of charts made with the Grammar of Graphics',
    defaultLanguage: 'zh', // 默认语言
    isAntVSite: false, // 是否是 AntV 的大官网
    siteUrl: homepage, // 官网地址
    githubUrl: repository.url, // GitHub 地址
    footerTheme: 'light', // 白色 底部主题
    showSearch: true, // 是否显示搜索框
    showGithubCorner: true, // 是否显示头部的 GitHub icon
    showGithubStars: true, // 是否显示 GitHub star 数量
    showAntVProductsCard: true, // 是否显示 AntV 产品汇总的卡片
    showLanguageSwitcher: true, // 是否显示官网语言切换
    showWxQrcode: true, // 是否显示头部菜单的微信公众号
    showChartResize: true, // 是否在 demo 页展示图表视图切换
    showAPIDoc: true, // 是否在 demo 页展示API文档
    themeSwitcher: 'g2',
    prefersColor: {
      default: 'light',
      switch: false,
    },
    versions: {
      // 历史版本以及切换下拉菜单
      [version]: 'https://g6-next.antv.antgroup.com',
      '4.x': 'https://g6.antv.antgroup.com',
      '3.2.x': 'https://g6-v3-2.antv.vision',
    },
    docsearchOptions: {
      // 头部搜索框配置
      apiKey: '9d1cd586972bb492b7b41b13a949ef30',
      indexName: 'antv_g6',
    },
    navs: [
      {
        slug: 'docs/manual/introduction',
        title: {
          zh: '教程',
          en: 'Manual',
        },
      },
      {
        slug: 'examples',
        title: {
          zh: '示例',
          en: 'Examples',
        },
      },
      {
        slug: 'docs/apis',
        title: {
          zh: 'API',
          en: 'API',
        },
      },
      {
        title: {
          zh: '其他资源',
          en: 'Online Tools',
        },
        dropdownItems: [
          {
            url: 'https://www.yuque.com/antv/g6-blog',
            name: {
              zh: '文章博客',
              en: 'Blog',
            },
          },
          {
            url: 'https://g6.antv.antgroup.com',
            name: {
              zh: '国内镜像',
              en: 'China Site',
            },
          },
        ],
      },
    ],
    ecosystems: [
      // 头部的菜单中的「周边生态」
    ],
    docs: [
      {
        slug: 'manual/v5',
        title: {
          zh: '🎉 新版本 5.0',
          en: '🎉 New v5.0',
        },
        order: 4,
      },
      {
        slug: 'manual/tutorial',
        title: {
          zh: '入门教程',
          en: 'Tutorial',
        },
        order: 5,
      },
      {
        slug: 'manual/advanced',
        title: {
          zh: '进阶教程',
          en: 'Advanced',
        },
        order: 6,
      },
      {
        slug: 'manual/customize',
        title: {
          zh: '自定义扩展',
          en: 'Customzing Extensions',
        },
        order: 7,
      },
      // ==========API====================
      {
        slug: 'apis/reference',
        title: {
          zh: 'API 文档',
          en: 'API Reference',
        },
        order: 1,
      },
      {
        slug: 'apis/data',
        title: {
          zh: '数据',
          en: 'Data',
        },
        order: 2,
      },
      {
        slug: 'apis/graph',
        title: {
          zh: '图实例',
          en: 'Graph',
        },
        order: 2,
      },
      {
        slug: 'apis/item',
        title: {
          zh: '元素',
          en: 'Elements',
        },
      },
      {
        slug: 'apis/item/node',
        title: {
          zh: '节点',
          en: 'Node',
        },
        order: 3,
      },
      {
        slug: 'apis/item/edge',
        title: {
          zh: '边',
          en: 'Edge',
        },
        order: 4,
      },
      {
        slug: 'apis/item/combo',
        title: {
          zh: 'Combo',
          en: 'Combo',
        },
        order: 5,
      },
      {
        slug: 'apis/shape',
        title: {
          zh: '图形',
          en: 'Shape',
        },
        order: 6,
      },
      {
        slug: 'apis/layout',
        title: {
          zh: '布局',
          en: 'layout',
        },
        order: 7,
      },
      {
        slug: 'apis/behaviors',
        title: {
          zh: '交互',
          en: 'Interaction',
        },
        order: 8,
      },
      {
        slug: 'apis/plugins',
        title: {
          zh: '自由插件',
          en: 'Plugin',
        },
        order: 9,
      },
    ],
    tutorials: [
      {
        slug: 'manual/about',
        title: {
          zh: '关于',
          en: 'About',
        },
        order: 1,
      },
    ],
    examples: [
      {
        slug: 'feature',
        icon: 'gallery',
        title: {
          zh: '5.0 新能力',
          en: '5.0 Features',
        },
      },
      {
        slug: 'net',
        icon: 'net',
        title: {
          zh: '图布局',
          en: 'Graph Layout',
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
        slug: 'performance',
        icon: 'net',
        title: {
          zh: '性能测试',
          en: 'Performance',
        },
      },
    ],
    mdPlayground: {
      // 第一个分块的大小
      splitPaneMainSize: '62%',
    },
    playground: {},
    announcement: {
      zh: '',
      en: '',
    },
    /** 首页技术栈介绍 */
    detail: {
      engine: {
        zh: 'G6',
        en: 'G6',
      },
      title: {
        zh: 'G6·图可视化引擎',
        en: 'G6·Graph Visualization Engine',
      },
      description: {
        zh: 'G6 是一个简单、易用、完备的图可视化引擎，它在高定制能力的基础上，提供了一系列设计优雅、便于使用的图可视化解决方案。能帮助开发者搭建属于自己的图可视化、图分析、或图编辑器应用。',
        en: 'G6 is graph visualization engine with simplicity and convenience. Based on the ability of customize, it provides a set of elegant graph visualization solutions, and helps developers to build up applications for graph visualization, graph analysis, and graph editor.',
      },
      image: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*6dSUSo3QTk0AAAAAAAAAAAAADmJ7AQ/original',
      imageStyle: {
        transform: 'scale(0.7)',
        marginLeft: '100px',
        marginTop: '70px',
      },
      buttons: [
        {
          text: {
            zh: '开始使用',
            en: 'Getting Started',
          },
          link: `/manual/introduction`,
        },
        {
          text: {
            zh: '图表示例',
            en: 'Examples',
          },
          link: `/examples`,
          type: 'primary',
        },
      ],
    },
    /** 新闻公告，优先选择配置的，如果没有配置则使用远程的！ */
    news: [
      {
        type: {
          zh: '推荐',
          en: 'News',
        },
        title: {
          zh: 'G6 5.0-beta 闪亮登场',
          en: 'G6 5.0-beta is released!',
        },
        date: '2023.08.31',
        link: 'https://zhuanlan.zhihu.com/p/653709725?',
      },
      {
        type: {
          zh: '推荐',
          en: 'News',
        },
        title: {
          zh: '图可视分析与搭建平台 GraphInsight 开源',
          en: 'GraphInsight is opened source!',
        },
        date: '2022.11.22',
        link: 'https://www.yuque.com/antv/blog/nyl5bkhdkicgm7v8',
      },
    ],
    /** 首页特性介绍 */
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
          en: 'According to practical bussiness scenarios, we found out the top solutions',
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
          en: 'Well-designed simple, flexible, and extendable intefaces will satisfy your infinite originality',
        },
      },
    ],
    /** 首页案例 */
    cases: [
      {
        logo: 'https://camo.githubusercontent.com/53886f0e306c9f01c96dee2edca3992830b7cbb769118029a7e5d677deb7e67e/68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f7a6f732f616e7466696e63646e2f306234487a4f63454a592f4772617068696e2e737667',
        title: {
          zh: 'Graphin 图可视分析组件',
          en: 'Graphin: Graph Insight',
        },
        description: {
          zh: 'Graphin 是一款基于 G6 封装的 React 分析组件库，专注在关系可视分析领域，简单高效，开箱即用。',
          en: "Graphin stands for Graph Insight. It's a toolkit based on G6 and React, that focuses on relational visual analysis.It's simple, efficient, out of the box.",
        },
        link: `https://graphin.antv.vision`,
        image: 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*LKq7Q5wPA0AAAAAAAAAAAAAAARQnAQ',
      },
      {
        logo: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ch6rTrCxb6YAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '基于 G6 的动态决策树',
          en: 'Interactive Decision Graph Powered by G6',
        },
        description: {
          zh: '基于 G6 实现的动态决策树，辅助用户寻找合适的可视化方式。它展示了 G6 强大的自定义节点和动画的能力。',
          en: 'It is an interactive graph for users to find out an appropriate visualization method for their requirements. The demo shows the powerful custom node and animation ability of G6.',
        },
        link: `/examples/case/graphDemos/#decisionBubbles`,
        image: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*10b6R5fkyJ4AAAAAAAAAAABkARQnAQ',
      },
      {
        logo: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*95GYRI0zPx8AAAAAAAAAAABkARQnAQ',
        title: {
          zh: '基于 G6 的图分析应用',
          en: 'Graph Analysis App Powered by G6',
        },
        description: {
          zh: '社交网络分析是图可视化中一个重要的应用场景。随着社交网络越来越流行，人与人、人与组织之间的关系变得越来越复杂，使用传统的分析手段，已经很难满足我们的分析需求。在这种情况下，图分析及图可视化显得愈发重要。',
          en: 'Social network is an important scenario in graph visualization. The relationships become complicate with the development of social network. Graph visualization and analysis do well on these complex cases.',
        },
        link: `/manual/cases/relations`,
        image: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RYFQSZYewokAAAAAAAAAAABkARQnAQ',
      },
      {
        logo: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IEQFS5VtXX8AAAAAAAAAAABkARQnAQ',
        title: {
          zh: '基于 G6 的关系时序分析应用',
          en: 'Dynamic Relationships Analysis Powered by G6',
        },
        description: {
          zh: '基于 G6 的关系时序分析应用，解决应急过程中流程、影响面、应急预案等一系列应急决策辅助信息和手段，快速止血以减少和避免故障升级。',
          en: 'This is an application for dynamic relationships analysis based on G6, which helps people deal with the flow, influence, and find out solutions to avoid losses and faults.',
        },
        link: `/manual/cases/sequenceTime`,
        image: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*m41kSpg17ZkAAAAAAAAAAABkARQnAQ',
      },
    ],
    /** 首页合作公司 */
    companies: [
      {
        name: '阿里云',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*V_xMRIvw2iwAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '支付宝',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*lYDrRZvcvD4AAAAAAAAAAABkARQnAQ',
      },
      {
        name: '天猫',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*BQrxRK6oemMAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '淘宝网',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*1l8-TqUr7UcAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '网上银行',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ZAKFQJ5Bz4MAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '京东',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*yh-HRr3hCpgAAAAAAAAAAABkARQnAQ',
      },
      {
        name: 'yunos',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_js7SaNosUwAAAAAAAAAAABkARQnAQ',
      },
      {
        name: '菜鸟',
        img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*TgV-RZDODJIAAAAAAAAAAABkARQnAQ',
      },
    ],
  },
  mfsu: false,
  alias: {
    '@': __dirname,
  },
  links: [],
  jsMinifier: 'terser',
  analytics: {
    ga_v2: 'G-YLQBGDK1GT',
  },
});
