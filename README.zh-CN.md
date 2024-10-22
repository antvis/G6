<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

<h1 align="center">
<b>G6：图分析引擎</b>
</h1>

![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![build](https://github.com/antvis/G6/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/antvis/G6/actions/) [![Coverage Status](https://coveralls.io/repos/github/antvis/G6/badge.svg?branch=master)](https://coveralls.io/github/antvis/G6?branch=master) ![typescript](https://img.shields.io/badge/language-typescript-red.svg) ![MIT](https://img.shields.io/badge/license-MIT-000000.svg) [![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6) [![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6)

## 什么是 G6

[G6](https://github.com/antvis/g6) 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等图可视化的基础能力。旨在让关系变得透明，简单。让用户获得关系数据的 Insight。基于 G6，用户可以快速搭建自己的 **图分析** 或 **图编辑** 应用。

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_PJ5SZELwq0AAAAAAAAAAAAADmJ7AQ/original' width=550 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zau8QJcVpDQAAAAAAAAAAABkARQnAQ' height=200 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RIlETY_S6IoAAAAAAAAAAABkARQnAQ' height=200 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cDzXR4jIWr8AAAAAAAAAAABkARQnAQ' height=150 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HTasSJGC4koAAAAAAAAAAABkARQnAQ' height=150 alt='' />

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150 alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*I9OdTbXJIi0AAAAAAAAAAABkARQnAQ" height=150 alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xoufSYcjK2AAAAAAAAAAAABkARQnAQ" height=150 alt='' />

## G6 的特性

G6 作为一款专业的图可视化引擎，具有以下特性：

- 丰富的元素：内置丰富的节点与边元素，自由配置，支持自定义；
- 可控的交互：内置 10+ 交互行为，支持自定义交互；
- 强大的布局：内置了 10+ 常用的图布局，支持自定义布局；
- 便捷的组件：优化内置组件功能及性能；
- 友好的体验：根据用户需求分层梳理文档，支持 TypeScript 类型推断。

除了默认好用、配置自由的内置功能，元素、交互、布局均具有高可扩展的自定义机制。

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*V0a9SoDnLHwAAAAAAAAAAAAADmJ7AQ/original' width=1000 alt='' />

> 丰富的图元素

## 安装

```bash
$ npm install @antv/g6
```

## 使用

<img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*khbvSrptr0kAAAAAAAAAAABkARQnAQ" width=437 height=148 alt='' />

```js
import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'Circle1',
      x: 150,
      y: 150,
    },
    {
      id: 'node2',
      label: 'Circle2',
      x: 400,
      y: 150,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  defaultNode: {
    type: 'circle',
    size: [100],
    color: '#5B8FF9',
    style: {
      fill: '#9EC9FF',
      lineWidth: 3,
    },
    labelCfg: {
      style: {
        fill: '#fff',
        fontSize: 20,
      },
    },
  },
  defaultEdge: {
    style: {
      stroke: '#e2e2e2',
    },
  },
});

graph.data(data);
graph.render();
```

[![Edit compassionate-lalande-5lxm7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/compassionate-lalande-5lxm7?fontsize=14&hidenavigation=1&theme=dark)

更多关于 G6 使用的问题，请参考[快速上手](https://g6-v4.antv.vision/manual/getting-started)。

## 开发

```bash
# 安装依赖 (请使用 pnpm)
pnpm install

# 构建
pnpm build

# 启动站点
pnpm start

# 更新子包, 例如 packages/core
cd ./packages/core
npm run watch

# run test case
$ npm test

# run test case in watch mode
npm test -- --watch ./tests/unit/algorithm/find-path-spec
DEBUG_MODE=1 npm test -- --watch ./tests/unit/algorithm/find-path-spec
```

## 文档

- <a href='https://g6-v4.antv.vision/manual/tutorial/preface' target='_blank'>入门教程</a>
- <a href='https://g6-v4.antv.vision/manual/middle/overview' target='_blank'>核心概念</a>
- <a href='https://g6-v4.antv.vision/manual/advanced/coordinate-system' target='_blank'>扩展阅读</a>
- <a href='https://g6-v4.antv.vision/api/graph' target='_blank'>API</a>

## React 项目集成

针对 React 项目集成，我们有一款单独的产品推荐：[Graphin](https://graphin.antv.vision)，它是基于 G6 封装的 React 组件库，专注在关系分析领域，简单高效，开箱即用。

目前 Graphin 在商业图分析项目中均有良好的实践，具体查看[《谁在使用 Graphin》](https://github.com/antvis/Graphin/issues/212)

## G6 图可视化交流群

欢迎各界 G6 使用者、图可视化爱好者加入 **G6 图可视化交流群** 及 **G6 图可视化交流二群**（钉钉群，使用钉钉扫一扫加入）讨论与交流。Graphin 的使用者，爱好者请加入 **Graphin's Group Chat**

> **G6 图可视化交流群** 已满员，该群会不定期移除不活跃的成员。

> 由于维护精力有限，**G6 图可视化交流群** 仅供社区同学相互交流，不进行答疑。欢迎对 G6 感兴趣的同学加入到答疑中来，非常感谢！

- 钉钉群：30088652
- 微信群：添加微信 **AntVG6** 联系进群

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*j137TJmS1dEAAAAAAAAAAAAADmJ7AQ/original" width="200" />

## 如何贡献

请让我们知道您要解决或贡献什么，所以在贡献之前请先提交 [issues](https://github.com/antvis/g6/issues) 描述 bug 或建议。

## License

[MIT license](./LICENSE).
