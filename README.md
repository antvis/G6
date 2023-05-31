# G6：图分析引擎

![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![travis-ci](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6) [![codecov](https://codecov.io/gh/antvis/G6/branch/master/graph/badge.svg)](https://codecov.io/gh/antvis/G6) ![typescript](https://img.shields.io/badge/language-typescript-red.svg) ![MIT](https://img.shields.io/badge/license-MIT-000000.svg) [![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6) [![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 "Percentage of issues still open")

[English README](README.en-US.md)

## 什么是 G6

[G6](https://github.com/antvis/g6) 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等图可视化的基础能力。旨在让关系变得透明，简单。让用户获得关系数据的 Insight。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='' />

基于 G6，用户可以快速搭建自己的 **图分析** 或 **图编辑** 应用。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zau8QJcVpDQAAAAAAAAAAABkARQnAQ' height=200 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RIlETY_S6IoAAAAAAAAAAABkARQnAQ' height=200 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cDzXR4jIWr8AAAAAAAAAAABkARQnAQ' height=150 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DifbSahOblAAAAAAAAAAAABkARQnAQ' height=150 /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HTasSJGC4koAAAAAAAAAAABkARQnAQ' height=150 alt='' />

> 强大的动画及交互

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150 alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*I9OdTbXJIi0AAAAAAAAAAABkARQnAQ" height=150 alt='' /><img src="https://user-images.githubusercontent.com/6113694/44995332-2ba61680-afd5-11e8-8cab-db0e9d08ceb7.gif" height=150 alt='' />

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" height=150><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" height=150 alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xoufSYcjK2AAAAAAAAAAAABkARQnAQ" height=150 alt='' />

> 强大的布局

## G6 的特性

G6 作为一款专业的图可视化引擎，具有以下特性：

- 丰富的元素：内置丰富的节点与边元素，自由配置，支持自定义；
- 可控的交互：内置 10+ 交互行为，支持自定义交互；
- 强大的布局：内置了 10+ 常用的图布局，支持自定义布局；
- 便捷的组件：优化内置组件功能及性能；
- 友好的体验：根据用户需求分层梳理文档，支持 TypeScript 类型推断。

除了默认好用、配置自由的内置功能，元素、交互、布局均具有高可扩展的自定义机制。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Y0c6S7cxjVkAAAAAAAAAAABkARQnAQ' width=800 height=200 alt='' />

> 丰富的图元素

## 安装 (5.0 Alpha)

```bash
$ npm install @antv/g6@5.0.0-alpha.4
```

## 使用 (5.0 Alpha)

<img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*khbvSrptr0kAAAAAAAAAAABkARQnAQ" width=437 height=148 alt='' />

图配置 Specification 类型见：https://github.com/antvis/G6/blob/v5/packages/g6/src/types/spec.ts

Graph API 见：https://github.com/antvis/G6/blob/2b44df189dd2e851447ba5a09541c372b49cd658/packages/g6/src/types/graph.ts#L23

```js
import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'Node 1',
      data: {
        x: 150,
        y: 150,
      }
    },
    {
      id: 'node2',
      label: 'Node 2',
      data: {
        x: 400,
        y: 150,
      }
    },
  ],
  edges: [
    {
      id: 'edge1',
      label: 'Edge 1',
      source: 'node1',
      target: 'node2',
      data: {}
    },
  ],
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  data,
  node: innerModel => {
    ...innerModel,
    type: 'circle',
    data: {
      ...innerModel.data,
      labelShape: {
        text: innerModel.label
      },
    }
  },
  defaultEdge: innerModel => {
    ...innerModel,
    type: 'line',
    data: {
      labelShape: {
        text: innerModel.label
      },
    }
  },
});
```

[![Edit compassionate-lalande-5lxm7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/compassionate-lalande-5lxm7?fontsize=14&hidenavigation=1&theme=dark)

## 开发 (5.0 Alpha)

```bash
# 从项目根目录进入到 g6 包文件目录下
$ cd packages/g6

# 安装依赖
$ npm install

# 构建
$ npm run build

# 启动集成测试 demo
$ npm run dev

# 运行所有单元测试
$ npm run test

# 运行单个单元测试
npm test -- --watch ./tests/unit/node-spec
DEBUG_MODE=1 npm test -- --watch ./tests/unit/node-spec
```

## 文档

使用文档待 5.0 稳定后完善。

## 如何贡献

请让我们知道您要解决或贡献什么，所以在贡献之前请先提交 [issues](https://github.com/antvis/g6/issues) 描述 bug 或建议。

## License

[MIT license](./LICENSE).
