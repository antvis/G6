<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

<h1 align="center">
<b>G6：图可视分析引擎</b>
</h1>

![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

<p align="center">
<a href="https://trendshift.io/repositories/9709" target="_blank"><img src="https://trendshift.io/api/badge/repositories/9709" alt="antvis%2FG6 | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
</p>

[![npm Version](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6)
[![Build Status](https://github.com/antvis/G6/actions/workflows/build.yml/badge.svg)](https://github.com/antvis/G6/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/antvis/G6/graph/badge.svg?token=OvIk06tCPa)](https://codecov.io/gh/antvis/G6)
[![npm Download](https://img.shields.io/npm/dm/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6)
![typescript](https://img.shields.io/badge/language-typescript-blue.svg)
[![npm License](https://img.shields.io/npm/l/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/antvis/G6)

<p align="center">
  <a href="https://g6.antv.antgroup.com/manual/introduction">简介</a> •
  <a href="https://g6.antv.antgroup.com/examples">图表示例</a> •
  <a href="https://g6.antv.antgroup.com/manual/getting-started/quick-start">快速开始</a> •
  <a href="https://g6.antv.antgroup.com/api/graph/method">API</a>
</p>

[G6](https://github.com/antvis/g6) 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画、主题、插件等图可视化和分析的基础能力。基于 G6，用户可以快速搭建自己的图可视化分析应用，让关系数据变得简单，透明，有意义。

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_PJ5SZELwq0AAAAAAAAAAAAADmJ7AQ/original' width=550 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zau8QJcVpDQAAAAAAAAAAABkARQnAQ' height=200 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RIlETY_S6IoAAAAAAAAAAABkARQnAQ' height=200 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cDzXR4jIWr8AAAAAAAAAAABkARQnAQ' height=150 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HTasSJGC4koAAAAAAAAAAABkARQnAQ' height=150 alt='' />

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150 alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*I9OdTbXJIi0AAAAAAAAAAABkARQnAQ" height=150 alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xoufSYcjK2AAAAAAAAAAAABkARQnAQ" height=150 alt='' />

## ✨ 特性

G6 作为一款专业的图可视化引擎，具有以下特性：

- **丰富的元素**：内置丰富的节点、边、Combo UI 元素，样式配置丰富，支持数据回调，且具备有灵活扩展自定义元素的机制。
- **可控的交互**：内置 10+ 交互行为，且提供丰富的各类事件，便于扩展自定义的交互行为。
- **高性能布局**：内置 10+ 常用的图布局，部分基于 GPU、Rust 并行计算提升性能，支持自定义布局。
- **便捷的组件**：优化内置组件功能及性能，且有灵活的扩展性，便于业务实现定制能力。
- **多主题色板**：提供了亮色、暗色两套内置主题，在 AntV 新色板前提下，融入 20+ 常用社区色板。
- **多环境渲染**：发挥 [G](https://github.com/antvis/g) 能力， 支持 Canvas、SVG 以及 WebGL，和 Node.js 服务端渲染；基于 WebGL 提供强大 3D 渲染和空间交互的插件包。
- **React 体系**：利用 React 前端生态，支持 React 节点，大大丰富 G6 的节点呈现样式。

## 🔨 开始使用

可以通过 NPM 或 Yarn 等包管理器来安装。

```bash
$ npm install @antv/g6
```

成功安装之后，可以通过 import 导入 `Graph` 对象。

```html
<div id="container"></div>
```

```js
import { Graph } from '@antv/g6';

// 准备数据
const data = {
  nodes: [
    /* your nodes data */
  ],
  edges: [
    /* your edges data */
  ],
};

// 初始化图表实例
const graph = new Graph({
  container: 'container',
  data,
  node: {
    palette: {
      type: 'group',
      field: 'cluster',
    },
  },
  layout: {
    type: 'force',
  },
  behaviors: ['drag-canvas', 'drag-node'],
});

// 渲染图
graph.render();
```

一切顺利，你可以得到下面的力导图!

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ue4iTYurc6sAAAAAAAAAAAAADmJ7AQ/fmt.webp" height="300" />

## 🌍 生态

- **Ant Design Charts**： React 图表库，基于 G2、G6、X6、L7。
- **Graphin**：基于 G6 的 React 简单封装，以及图可视化应用研发的 SDK。

更多生态开源项目，欢迎 PR 收录进来。

## 📮 贡献

感谢所有为这个项目做出贡献的人，感谢所有支持者！🙏

<a href="https://openomy.app/github/antvis/G6" target="_blank" style="display: block; width: 100%;" align="center">
  <img src="https://openomy.app/svg?repo=antvis/G6&chart=bubble&latestMonth=3" target="_blank" alt="Contribution Leaderboard" style="display: block; width: 100%;" />
 </a>

- **问题反馈**：使用过程遇到的 G6 的问题，欢迎提交 Issue，并附上可以复现问题的最小案例代码。
- **贡献指南**：如何参与到 G6 的[开发和贡献](https://g6.antv.antgroup.com/manual/contribute)。
- **想法讨论**：在 GitHub Discussion 上或者钉钉群里面讨论。

<div>
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*CQoGSoFBzaUAAAAAAAAAAAAADmJ7AQ/fmt.webp" height="256" />
</div>

## 📄 License

[MIT](./LICENSE).
