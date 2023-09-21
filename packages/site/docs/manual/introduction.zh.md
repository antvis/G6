---
title: 简介
order: 0
redirect_from:
  - /zh/docs/manual
---

![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![travis-ci](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6) [![codecov](https://codecov.io/gh/antvis/G6/branch/master/graph/badge.svg)](https://codecov.io/gh/antvis/G6) ![typescript](https://img.shields.io/badge/language-typescript-red.svg) ![MIT](https://img.shields.io/badge/license-MIT-000000.svg) [![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6) [![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 'Percentage of issues still open')

[English README](README.en-US.md)

## 什么是 G6

[G6](https://github.com/antvis/g6) 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等图可视化的基础能力。旨在让关系变得透明，简单。让用户获得关系数据的 Insight。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='' />

基于 G6，用户可以快速搭建自己的 **图分析** 或 **图编辑** 应用。

## 🎉 G6 的特性 (5.0 Beta)

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

- 丰富的元素：内置丰富的节点与边元素，自由配置，支持自定义；
- 便捷的组件：优化内置组件功能及性能；
- 支持 TreeShaking 减少包体积。

除了默认好用、配置自由的内置功能，元素、交互、布局均具有高可扩展的自定义机制。

## 安装 (5.0 Beta)

```bash
$ npm install @antv/g6@5.0.0-beta.10
```

## 使用 (5.0 Beta)

图配置 Specification 类型见：[Specification Doc](https://g6-next.antv.antgroup.com/apis/interfaces/graph/specification)

Graph API 见：[Graph API](https://g6-next.antv.antgroup.com/apis/interfaces/graph/i-graph)

最简单的图 Demo：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M-MTRaLiZN0AAAAAAAAAAAAADmJ7AQ/original" width=437 height=138 alt='' />

[![Edit compassionate-lalande-5lxm7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/g6-v5-beta-quick-start-m3yncv?from-embed=&file=/index.js)

```js
import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        label: 'Node 1',
        x: 150,
        y: 150,
      },
    },
    {
      id: 'node2',
      data: {
        label: 'Node 2',
        x: 400,
        y: 150,
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      data: {
        label: 'Edge 1',
      },
    },
  ],
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  data,
  node: (innerModel) => ({
    ...innerModel,
    type: 'circle',
    data: {
      ...innerModel.data,
      labelShape: {
        text: innerModel.label,
      },
      labelBackgroundShape: {},
      iconShape: {
        img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      },
    },
  }),
  edge: (innerModel) => ({
    ...innerModel,
    type: 'line',
    data: {
      labelShape: {
        text: innerModel.label,
      },
      labelBackgroundShape: {},
    },
  }),
});
```

## 开发 (5.0 Beta)

```bash
# 安装依赖

$ pnpm install

# 从项目根目录进入到 g6 包文件目录下
$ cd packages/g6

# 构建
$ npm run build

# 启动集成测试 demo
$ npm run dev

# 测试 lint
$ npm run lint

# 修复 lint
$ npm run fix

# 运行所有单元测试
$ npm run test:integration

# 运行单个单元测试：修改 package.json 中 test:integration_one 命令指定的测试文件目录，然后执行：
$ npm run test:integration_one
```

## 如何贡献

请让我们知道您要解决或贡献什么，所以在贡献之前请先提交 [issues](https://github.com/antvis/g6/issues) 描述 bug 或建议。

### 赏金猎人计划

参见 [Issue Hunt 计划文档](https://github.com/antvis/G6/blob/v5-readme/ISSUEHUNT.md)。

## License

[MIT license](./LICENSE).
