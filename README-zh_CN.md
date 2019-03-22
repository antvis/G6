![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 "Percentage of issues still open")

[English README](README.md)

G6 是一个图可视化框架。它提供了一套图可视化的基础设置，能帮助开发者搭建属于自己的图 **图分析** 应用或是 **图编辑器** 应用。 详情请见[开发文档](https://www.yuque.com/antv/g6/intro)。

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150><img src="https://cdn.nlark.com/yuque/0/2018/gif/93506/1535955277773-840190f8-836a-4bd6-875a-b3a18e6cebf1.gif" height=150><img src="https://user-images.githubusercontent.com/6113694/44995332-2ba61680-afd5-11e8-8cab-db0e9d08ceb7.gif" height=150>

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" height=150><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" height=150><img src="https://cdn.nlark.com/yuque/0/2019/gif/174835/1552990627466-92a4ce23-79b2-4930-ab05-6478b56ce880.gif" height=150>

## [G6-Editor](https://yuque.com/antv/g6-editor)
<img src="https://gw.alipayobjects.com/zos/rmsportal/nzmycBewjfxKDbepTDlT.gif" width=560>
<img src="https://gw.alipayobjects.com/zos/rmsportal/WVqnbgJmamdahbAuDpBL.gif" width=560>
<img src="https://cdn.nlark.com/yuque/0/2018/png/93506/1542618842515-6655c4aa-5345-40b5-b496-236f0c89c8f3.png" width=560>

## G6-Analyzer [coming soon]

![](https://gw.alipayobjects.com/zos/rmsportal/GxupfuhWyMZWwPWWYgaO.gif)

## 安装

```bash
$ npm install @antv/g6
```

<img src="https://gw.alipayobjects.com/zos/rmsportal/qSUOQUhnRrHCLvEjhZGP.png" />

## Usage
```js
import G6 from '@antv/g6';

  const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200
  },{
    id: 'node2',
    x: 300,
    y: 200
  }],
  edges: [{
    target: 'node2',
    source: 'node1'
  }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  nodeStyle: {
    default: {
      fill: '#40a9ff',
      stroke: '#096dd9'
    }
  },
  edgeStyle: {
    default: { stroke: '#A3B1BF' }
  }
});
graph.read(data);
```

## 开发

```bash
$ npm install

# run test case
$ npm run test-live

# build watching file changes and run demos
$ npm run dev
```

## 如何贡献

请让我们知道您要解决或贡献什么，所以在贡献之前请先提交 [issues](https://github.com/antvis/g6/issues) 描述 bug 或建议。

成为一个贡献者前请阅读 [代码贡献规范](https://github.com/antvis/g6/blob/master/CONTRIBUTING.zh-CN.md).

## License

[MIT license](./LICENSE).
