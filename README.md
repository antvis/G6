# G6：图分析引擎

> 5.0 beta 版本中还在快速迭代中，预计 2024.06.06 发布正式版本，期间可能会有 API 的一些变更，线上业务谨慎使用。

![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![travis-ci](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6) [![codecov](https://codecov.io/gh/antvis/G6/branch/master/graph/badge.svg)](https://codecov.io/gh/antvis/G6) ![typescript](https://img.shields.io/badge/language-typescript-red.svg) ![MIT](https://img.shields.io/badge/license-MIT-000000.svg) [![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6) [![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 "Percentage of issues still open")

[English README](README.en-US.md)

## 什么是 G6

[G6](https://github.com/antvis/g6) 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等图可视化的基础能力。旨在让关系变得透明，简单。让用户获得关系数据的 Insight。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='' />

基于 G6，用户可以快速搭建自己的 **图分析** 或 **图编辑** 应用。

## G6 的特性 (5.0 Alpha)

G6 作为一款专业的图可视化引擎，具有以下特性：

- 易扩展：七大插件化模块（见下图）；
- 样式、动画规范，信息分层（见下图）；
- 内置亮色、暗色主题，主题可自定义；动画易配置（见下图）；
- 高性能布局：内置了 10+ 常用的图布局，支持 GPU、Rust 并行计算，支持自定义布局；
- 可控的交互：内置 10+ 交互行为，支持自定义交互；
- 友好的体验：根据用户需求分层梳理文档，支持 TypeScript 类型推断；
- 运行时切换多渲染器：Canvas、SVG、WebGL；
- 3D 大图：

GIF 未完整加载，[点此看原图](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qPrmQrdV77gAAAAAAAAAAAAADmJ7AQ/original)

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IUOnSbLisyoAAAAAAAAAAAAADmJ7AQ/original" width=600 height=334 alt='' />

> 3D 大图

GIF 未完整加载，[点此看原图](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1BFvQ4r3P7UAAAAAAAAAAAAADmJ7AQ/original)

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tPPGSokdSYsAAAAAAAAAAAAADmJ7AQ/original" width=600 height=367 alt='' />

> 动画规范与信息分层

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QjJoSbD7GTwAAAAAAAAAAAAADmJ7AQ/original" width=800 height=226 alt='' />

> 内置主题与自定义主题

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*x7NTT5_baKYAAAAAAAAAAAAADmJ7AQ/original" width=400 height=218 alt='' />

> 七大插件化模块

- （待迁移）丰富的元素：内置丰富的节点与边元素，自由配置，支持自定义；
- （待迁移）便捷的组件：优化内置组件功能及性能；

除了默认好用、配置自由的内置功能，元素、交互、布局均具有高可扩展的自定义机制。

## 安装 (5.0 Alpha)

```bash
$ npm install @antv/g6@5.0.0-beta.28
```

## 使用 (5.0 Alpha)

图配置 Specification 类型见：https://github.com/antvis/G6/blob/v5/packages/g6/src/types/spec.ts

Graph API 见：https://github.com/antvis/G6/blob/2b44df189dd2e851447ba5a09541c372b49cd658/packages/g6/src/types/graph.ts#L23

最简单的图 Demo：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M-MTRaLiZN0AAAAAAAAAAAAADmJ7AQ/original" width=437 height=138 alt='' />

[![Edit compassionate-lalande-5lxm7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/musing-matan-q255po?fontsize=14&hidenavigation=1&theme=dark)

```js
import { Graph } from "@antv/g6";

const data = {
  nodes: [
    {
      id: "node1",
      label: "Node 1",
      data: {
        x: 150,
        y: 150,
      },
    },
    {
      id: "node2",
      label: "Node 2",
      data: {
        x: 400,
        y: 150,
      },
    },
  ],
  edges: [
    {
      id: "edge1",
      label: "Edge 1",
      source: "node1",
      target: "node2",
      data: {},
    },
  ],
};

const graph = new Graph({
  container: "container",
  width: 500,
  height: 500,
  data,
  node: (innerModel) => ({
    ...innerModel,
    type: "circle",
    data: {
      ...innerModel.data,
      labelShape: {
        text: innerModel.label,
      },
      labelBackgroundShape: {},
      iconShape: {
        img: "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
      },
    },
  }),
  edge: (innerModel) => ({
    ...innerModel,
    type: "line",
    data: {
      labelShape: {
        text: innerModel.label,
      },
      labelBackgroundShape: {},
    },
  }),
});
```

## 开发 (5.0 Alpha)

```bash
# 在项目的根目录安装依赖

$ pnpm install

# 从项目根目录进入到 g6 包文件目录下
$ cd packages/g6

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
