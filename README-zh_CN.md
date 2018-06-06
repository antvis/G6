# G6: JavaScript 图可视化引擎.

![](https://img.shields.io/badge/language-javascript-red.svg)

[English README](README.md)

G6 是一个图可视化框架。它提供了一套图可视化的基础设置，能帮助开发者搭建属于自己的图 **图分析** 应用或是 **图编辑器** 应用。

[详情见 G6 官方站点](https://antv.alipay.com/zh-cn/g6/1.x/index.html)

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" width="300"/><img src="https://gw.alipayobjects.com/zos/rmsportal/JoZlKzpKunychGozAWKz.gif" width="370"/>

## [G6-Editor](https://yuque.com/antv/g6-editor)

![](https://gw.alipayobjects.com/zos/rmsportal/nzmycBewjfxKDbepTDlT.gif)
![](https://gw.alipayobjects.com/zos/rmsportal/WVqnbgJmamdahbAuDpBL.gif)

## G6-Analyser [coming soon]

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
  height: 500
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

Please let us know how can we help. Do check out [issues](https://github.com/antvis/g6/issues) for bug reports or suggestions first.

请让我们知道您要解决或贡献什么，所以在贡献之前请先提交 [issues](https://github.com/antvis/g6/issues) 描述 bug 或建议。

成为一个贡献者前请阅读 [代码贡献规范](https://github.com/antvis/g6/blob/master/CONTRIBUTING.zh-CN.md).