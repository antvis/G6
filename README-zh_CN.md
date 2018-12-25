![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 "Percentage of issues still open")

[English README](README.md)

G6 是一个图可视化框架。它提供了一套图可视化的基础设置，能帮助开发者搭建属于自己的图 **图分析** 应用或是 **图编辑器** 应用。

[完整文档](https://www.yuque.com/antv/g6)

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150><img src="https://cdn.nlark.com/yuque/0/2018/gif/93506/1535955277773-840190f8-836a-4bd6-875a-b3a18e6cebf1.gif" height=150><img src="https://user-images.githubusercontent.com/6113694/44995332-2ba61680-afd5-11e8-8cab-db0e9d08ceb7.gif" height=150>

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" height=150><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" height=150>

## [G6-Editor](https://yuque.com/antv/g6-editor)

<img src="https://gw.alipayobjects.com/zos/rmsportal/nzmycBewjfxKDbepTDlT.gif" width=560>
<img src="https://gw.alipayobjects.com/zos/rmsportal/WVqnbgJmamdahbAuDpBL.gif" width=560>

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

## 体验改进计划说明
为了更好服务用户，G6 会将 URL 和版本信息发送回 AntV 服务器：
https://kcart.alipay.com/web/bi.do
除了 URL 与 G6 版本信息外，不会收集任何其他信息。如有担心，可以通过下面的代码关闭：
```js
// 关闭 G6 的体验改进计划打点请求
G6.track(false)
```
## License

[MIT license](./LICENSE).
