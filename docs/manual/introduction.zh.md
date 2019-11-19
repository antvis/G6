---
title: 简介
order: 0
redirect_from:
  - /zh/docs/manual
  - /en/docs/manual
---

<img src='https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png' width='750' height='250' />

[![](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 "Percentage of issues still open")

[English README](https://github.com/antvis/g6)

## 什么是 G6
[G6](https://github.com/antvis/g6) 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等图可视化的基础能力。旨在让关系变得透明，简单。让用户获得关系数据的 Insight。

![68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f7a6f732f726d73706f7274616c2f485178596775696e464f4d49587247514f4142592e676966.gif](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ObTOSKnlQb4AAAAAAAAAAABkARQnAQ)

基于 G6，用户可以快速搭建自己的 **图分析** 或 **图编辑** 应用。

如果你还没有使用过 G6， 建议通过[快速上手](./getting-started)先体验一下 G6 的魅力。

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*I9OdTbXJIi0AAAAAAAAAAABkARQnAQ" height=150><img src="https://user-images.githubusercontent.com/6113694/44995332-2ba61680-afd5-11e8-8cab-db0e9d08ceb7.gif" height=150>

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" height=150><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" height=150><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xoufSYcjK2AAAAAAAAAAAABkARQnAQ" height=150>

## G6 的特性
G6 作为一款专业的图可视化引擎，具有以下特性：
- 丰富的元素：内置丰富的节点与边元素，自由配置，支持自定义；
- 可控的交互：内置 10+ 交互行为，支持自定义交互；
- 强大的布局：内置了 10+ 常用的图布局，支持自定义布局；
- 便捷的组件：优化内置组件功能及性能；
- 友好的体验：根据用户需求分层梳理文档，支持 TypeScript 类型推断。

除了默认好用、配置自由的内置功能，元素、交互、布局均具有高可扩展的自定义机制。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Y0c6S7cxjVkAAAAAAAAAAABkARQnAQ' width=600 height=200 />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Eh7yQ5ddu7MAAAAAAAAAAABkARQnAQ' width=200 height=200/>

## G6 文档
- [G6 入门教程](/zh/docs/manual/tutorial/preface)
- [G6 核心概念](/zh/docs/manual/middle/keyConcept)
- [G6 高级指引](/zh/docs/manual/advanced/shape-and-properties)

## 快速上手

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*srtDT5slbN8AAAAAAAAAAABkARQnAQ' width=400>

```javascript
  // 定义数据源
  const data = {
    // 点集
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200
    },{
      id: 'node2',
      x: 300,
      y: 200
    }],
    // 边集
    edges: [
      // 表示一条从 node1 节点连接到 node2 节点的边
      {
        source: 'node1',
        target: 'node2'
      }
    ]
  };
  
  // 创建 G6 图实例
  const graph = new G6.Graph({
    container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
    // 画布宽高
    width: 800,
    height: 500
  });
  // 读取数据
  graph.data(data);
  // 渲染图
  graph.render();
```

更详细的内容请参考[快速上手](./getting-started)文档。

## 友情链接
结合前端库的第三方实现：

- [基于 G6 和 React 的可视化流程编辑器](https://github.com/guozhaolong/wfd) - [Workflow Designer](https://github.com/guozhaolong/wfd)；
- [基于 G6 和 Vue 的可视化编辑器](https://github.com/caoyu48/vue-g6-editor)；
- [基于 G6 和 Vue 的可视化图形编辑器](https://github.com/OXOYO/X-Flowchart-Vue) - [A visual graph editor based on G6 and Vue](https://github.com/OXOYO/X-Flowchart-Vue)。


## G6 图可视化交流群
欢迎各界 G6 使用者、图可视化爱好者加入 **G6 图可视化交流群**（钉钉群，使用钉钉扫一扫加入）讨论与交流。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dsXsSpgynmUAAAAAAAAAAABkARQnAQ' width=400>

## 如何贡献

请让我们知道您要解决或贡献什么，所以在贡献之前请先提交 [issues](https://github.com/antvis/g6/issues) 描述 bug 或建议。

成为一个贡献者前请阅读 [代码贡献规范](https://github.com/antvis/g6/blob/master/CONTRIBUTING.zh-CN.md).

## License

[MIT license](https://github.com/antvis/g6/blob/master/LICENSE).

