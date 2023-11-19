---
title: 简介
order: 0
redirect_from:
  - /zh/docs/manual
---

![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![travis-ci](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6) [![codecov](https://codecov.io/gh/antvis/G6/branch/master/graph/badge.svg)](https://codecov.io/gh/antvis/G6) ![typescript](https://img.shields.io/badge/language-typescript-red.svg) ![MIT](https://img.shields.io/badge/license-MIT-000000.svg) [![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6) [![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 'Percentage of issues still open')

[English README](README.en-US.md)

[G6](https://github.com/antvis/g6) 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等图可视化能力。旨在为开发者提供一套简单易用、专业可靠、可高度定制的图可视化开发工具。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='' />

## 🎉 全新 G6 5.0

G6 作为一款专业的图可视化引擎，具有以下特性：

- 易于扩展，支持自定义元素、交互、布局、渲染器等

  - 丰富的元素：内置丰富的节点与边元素，自由配置，支持自定义
  - 便捷的组件：优化内置组件功能及性能
  - 支持 TreeShaking 减少包体积

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*x7NTT5_baKYAAAAAAAAAAAAADmJ7AQ/original" width=400 height=218 alt='' />

- 全新样式和动画设计规范，支持信息分层显示

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tPPGSokdSYsAAAAAAAAAAAAADmJ7AQ/original" width=600 height=367 alt='' />

> 动画规范与信息分层 [查看原图](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1BFvQ4r3P7UAAAAAAAAAAAAADmJ7AQ/original)

- 提供内置的亮色和暗色主题，主题可定制，动画配置简便

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QjJoSbD7GTwAAAAAAAAAAAAADmJ7AQ/original" width=800 height=226 alt='' />

> 内置主题与自定义主题

- 高性能布局，内置 10+ 常用的图布局，支持 GPU、Rust 并行计算，并可自定义布局
- 可定制交互，内置 10+ 交互行为，支持自定义交互
- 开发者友好，提供完整 TypeScript 类型支持
- 运行时渲染器切换，支持 Canvas、SVG、WebGL 多种渲染方式
- 支持 3D 大图显示

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IUOnSbLisyoAAAAAAAAAAAAADmJ7AQ/original" width=600 height=334 alt='' />

> 3D 大图 [查看原图](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qPrmQrdV77gAAAAAAAAAAAAADmJ7AQ/original)

除了默认好用、配置自由的内置功能，元素、交互、布局均具有高可扩展的自定义机制。

## 参与贡献

请让我们知道您要解决或贡献什么，在贡献之前请先提交 [issues](https://github.com/antvis/g6/issues) 描述 bug 或建议

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

### 赏金猎人计划

参见 [Issue Hunt 计划文档](https://github.com/antvis/G6/blob/v5-readme/ISSUEHUNT.md)。

## License

[MIT license](./LICENSE).
