---
title: 简介
order: 0
redirect_from:
  - /zh/docs/manual
---

<img src="https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png" height="250" alt="g6 banner" />

[![](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6) [![Coverage Status](https://coveralls.io/repos/github/antvis/G6/badge.svg)](https://coveralls.io/github/antvis/G6) ![](https://img.shields.io/badge/language-javascript-red.svg) ![](https://img.shields.io/badge/license-MIT-000000.svg) [![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6) [![NPM downloads](https://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6) [![Percentage of issues still open](https://isitmaintained.com/badge/open/antvis/g6.svg)](https://isitmaintained.com/project/antvis/g6 'Percentage of issues still open')

[English Introduction](/en/docs/manual/introduction/)

## 什么是 G6

<a href='https://github.com/antvis/g6' target='_blank'>G6</a> 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等图可视化的基础能力。旨在让关系变得透明，简单。让用户获得关系数据的 Insight。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='img'/>

基于 G6，用户可以快速搭建自己的 **图分析** 或 **图编辑** 应用。

如果您还没有使用过 G6， 建议通过 [快速上手](/zh/docs/manual/getting-started) 抢先体验 G6 的魅力。

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150 alt='img' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*I9OdTbXJIi0AAAAAAAAAAABkARQnAQ" height=150 alt='img' /><img src="https://user-images.githubusercontent.com/6113694/44995332-2ba61680-afd5-11e8-8cab-db0e9d08ceb7.gif" height=150 alt='img' />

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" height=150 alt='img' /><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" height=150 alt='img' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xoufSYcjK2AAAAAAAAAAAABkARQnAQ" height=150 alt='img' />

> 强大的布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dJT3SIVta6QAAAAAAAAAAABkARQnAQ' width=800 alt='img'/>

> 强大的动画及交互

## G6 的特性

G6 作为一款专业的图可视化引擎，具有以下特性：

- 优秀的性能：支持大规模图数据的交互与探索；
- 丰富的元素：内置丰富的节点与边元素，自由配置，支持自定义；
- 可控的交互：内置 10+ 交互行为，支持自定义交互；
- 强大的布局：内置了 10+ 常用的图布局，支持自定义布局；
- 便捷的组件：优化内置组件功能及性能；
- 友好的体验：根据用户需求分层梳理文档，支持 TypeScript 类型推断。

除了默认好用、配置自由的内置功能，元素、交互、布局均具有高可扩展的自定义机制。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Y0c6S7cxjVkAAAAAAAAAAABkARQnAQ' width=800 alt='img'/>

> 丰富的图元素

## G6 文档

- [G6 入门教程](/zh/docs/manual/tutorial/preface)
- [G6 核心概念](/zh/docs/manual/middle/graph)
- [G6 扩展阅读](/zh/docs/manual/advanced/coordinate-system)
- [API](/zh/docs/api/Graph)
- [G6 Blog](https://www.yuque.com/antv/g6-blog)

## 快速上手

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*srtDT5slbN8AAAAAAAAAAABkARQnAQ' width=400 alt='img' />

```javascript
// 定义数据源
const data = {
  // 点集
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 200,
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
    },
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// 创建 G6 图实例
const graph = new G6.Graph({
  container: 'mountNode', // 指定图画布的容器 id
  // 画布宽高
  width: 800,
  height: 500,
});
// 读取数据
graph.data(data);
// 渲染图
graph.render();
```

更详细的内容请参考 [快速上手](/zh/docs/manual/getting-started) 文档。

## 友情链接

官方独立产品：Graphin

Graphin 取名意为 Graph Insight（图的分析洞察），是一个基于 G6 封装的 React 组件库，专注在关系可视分析领域，简单高效，开箱即用。

- github： https://github.com/antvis/Graphin
- 官网：https://graphin.antv.vision

结合前端库的第三方实现：

- <a href='https://github.com/guozhaolong/wfd' target='_blank'>基于 G6 和 React 的可视化流程编辑器 - Workflow Designer</a>；
- <a href='https://github.com/caoyu48/vue-g6-editor' target='_blank'>基于 G6 和 Vue 的可视化编辑器</a>[]()；
- <a href='https://github.com/OXOYO/X-Flowchart-Vue' target='_blank'>基于 G6 和 Vue 的可视化图形编辑器 - A visual graph editor based on G6 and Vue</a>；
- <a href='https://github.com/lusess123/web-pdm' target='_blank'>基于 G6 和 React 实现的 ER 图编辑器</a>；
- <a href='https://github.com/dappsnation/ng-antv' target='_blank'>基于 G6 和 Angular 实现的编辑器</a>
- <a href='https://github.com/claudewowo/welabx-g6' target='_blank'>基于 G6 和 Vue 的流程图编辑器</a>

## G6 图可视化交流群

欢迎各界 G6 使用者、图可视化爱好者加入 **G6 图可视化交流群** 及 **G6 图可视化交流二群**（钉钉群，使用钉钉扫一扫加入）讨论与交流。Graphin 的使用者，爱好者请加入 **Graphin's Group Chat**

> **G6 图可视化交流群** 已满员，该群会不定期移除不活跃的成员。

> 由于维护精力有限，**G6 图可视化交流群** 仅供社区同学相互交流，不进行答疑。欢迎对 G6 感兴趣的同学加入到答疑中来，非常感谢！

<p >
  <a href="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-RO_R7SCvroAAAAAAAAAAAAAARQnAQ" >
    <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-RO_R7SCvroAAAAAAAAAAAAAARQnAQ' style='width:250px;display:inline-block;vertical-align:top;' alt='' />
  </a>
  <a href="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hzfaSrAj0jkAAAAAAAAAAABkARQnAQ" >
    <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hzfaSrAj0jkAAAAAAAAAAABkARQnAQ' style='width:250px;display:inline-block;vertical-align:top;' alt='' />
  </a>
  <a href="https://graphin.antv.vision/" >
   <img src='https://camo.githubusercontent.com/5e6624abcdde991f9fd89fce4933ad133a48d8fb603d1852c670da329df73ef7/68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f6d646e2f726d735f3430326331612f616674732f696d672f412a2d717a6f54704c672d3163414141414141414141414141414152516e4151' style='width:250px;display:inline-block;vertical-align: top;' alt='' />
  </a>
</p>

## 如何贡献

请让我们知道您要解决或贡献什么，所以在贡献之前请先提交 <a href='https://github.com/antvis/g6/issues' target='_blank'>issues</a> 描述 bug 或建议。

## License

<a href='https://github.com/antvis/g6/blob/master/LICENSE' target='_blank'>MIT license</a>。
