![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6)
![](https://img.shields.io/badge/language-typescript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 "Percentage of issues still open")

[English README](README.md)


## 什么是 G6
[G6](https://github.com/antvis/g6) 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等图可视化的基础能力。旨在让关系变得透明，简单。让用户获得关系数据的 Insight。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 />

基于 G6，用户可以快速搭建自己的 **图分析** 或 **图编辑** 应用。


<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zau8QJcVpDQAAAAAAAAAAABkARQnAQ' height=200 /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RIlETY_S6IoAAAAAAAAAAABkARQnAQ' height=200 />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cDzXR4jIWr8AAAAAAAAAAABkARQnAQ' height=150 /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DifbSahOblAAAAAAAAAAAABkARQnAQ' height=150 /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HTasSJGC4koAAAAAAAAAAABkARQnAQ' height=150 />

> 强大的动画及交互

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*I9OdTbXJIi0AAAAAAAAAAABkARQnAQ" height=150><img src="https://user-images.githubusercontent.com/6113694/44995332-2ba61680-afd5-11e8-8cab-db0e9d08ceb7.gif" height=150>

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" height=150><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" height=150><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xoufSYcjK2AAAAAAAAAAAABkARQnAQ" height=150>

> 强大的布局

## G6 的特性
G6 作为一款专业的图可视化引擎，具有以下特性：
- 丰富的元素：内置丰富的节点与边元素，自由配置，支持自定义；
- 可控的交互：内置 10+ 交互行为，支持自定义交互；
- 强大的布局：内置了 10+ 常用的图布局，支持自定义布局；
- 便捷的组件：优化内置组件功能及性能；
- 内置 DFS、Dijkstra、detect-cycle 等图算法，参考 [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)；
- 友好的体验：根据用户需求分层梳理文档，支持 TypeScript 类型推断。

除了默认好用、配置自由的内置功能，元素、交互、布局均具有高可扩展的自定义机制。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Y0c6S7cxjVkAAAAAAAAAAABkARQnAQ' width=800 height=200 />

> 丰富的图元素

## 安装

```bash
$ npm install @antv/g6
```

## 使用

<img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*khbvSrptr0kAAAAAAAAAAABkARQnAQ" width=437 height=148 />


```js
import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'Circle1',
      x: 150,
      y: 150
    },
    {
      id: 'node2',
      label: 'Circle2',
      x: 400,
      y: 150
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    }
  ]
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  defaultNode: {
    shape: 'circle',
    size: [ 100 ],
    color: '#5B8FF9',
    style: {
      fill: '#9EC9FF',
      lineWidth: 3
    },
    labelCfg: {
      style: {
        fill: '#fff',
        fontSize: 20
      }
    }
  },
  defaultEdge: {
    style: {
      stroke: '#e2e2e2'
    }
  }
});

graph.data(data);
graph.render();
```

[![Edit compassionate-lalande-5lxm7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/compassionate-lalande-5lxm7?fontsize=14&hidenavigation=1&theme=dark)

更多关于 G6 使用的问题，请参考[快速上手](https://antv-g6.gitee.io/zh/docs/manual/getting-started)。

## 开发

```bash
$ npm install

# run test case
$ npm run test-live

# build watching file changes and run demos
$ npm run dev
```

## 文档
- <a href='https://g6.antv.vision/zh/docs/manual/tutorial/preface' target='_blank'>入门教程</a>
- <a href='https://g6.antv.vision/zh/docs/manual/middle/graph' target='_blank'>核心概念</a>
- <a href='https://g6.antv.vision/zh/docs/manual/advanced/keyconcept/shape-and-properties' target='_blank'>高级指引</a>
- <a href='https://g6.antv.vision/zh/docs/api/Graph/' target='_blank'>API</a>


## G6 图可视化交流群

欢迎各界 G6 使用者、图可视化爱好者加入 **G6 图可视化交流群** 及 **G6 图可视化交流二群**（钉钉群，使用钉钉扫一扫加入）讨论与交流。

> **G6 图可视化交流群** 已满员，该群会不定期移除不活跃的成员。

> 由于值班同学的时间和精力有限，**G6 图可视化交流二群** 中的问题我们会不定期回复。欢迎对 G6 感兴趣的同学加入到答疑中来，非常感谢！

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hzfaSrAj0jkAAAAAAAAAAABkARQnAQ' width=400 alt="">

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7uu-T7kp6uUAAAAAAAAAAABkARQnAQ' width=400 alt="">


## 如何贡献

请让我们知道您要解决或贡献什么，所以在贡献之前请先提交 [issues](https://github.com/antvis/g6/issues) 描述 bug 或建议。

成为一个贡献者前请阅读 [代码贡献规范](https://github.com/antvis/g6/blob/master/CONTRIBUTING.zh-CN.md).

## License

[MIT license](./LICENSE).

