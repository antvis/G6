# G6: The Graph visualization framework in JavaScript.

![](https://img.shields.io/badge/language-javascript-red.svg)

[中文 README](README-zh_CN.md)

G6 is a graph visualization framework. It provides a set of base mechanisms, help developers to build their own graph visualization **analysis** application or graph visualization **edit** application.

[More details about G6.](https://antv.alipay.com/zh-cn/g6/1.x/index.html)

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" width=250><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" width=370>

## [G6-Editor](https://yuque.com/antv/g6-editor)

![](https://gw.alipayobjects.com/zos/rmsportal/nzmycBewjfxKDbepTDlT.gif)
![](https://gw.alipayobjects.com/zos/rmsportal/WVqnbgJmamdahbAuDpBL.gif)

## G6-Analyser [coming soon]

![](https://gw.alipayobjects.com/zos/rmsportal/GxupfuhWyMZWwPWWYgaO.gif)

## Installation

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

## Development

```bash
$ npm install

# run test case
$ npm run test-live

# build watching file changes and run demos
$ npm run dev
```

## How to Contribute

Please let us know how can we help. Do check out [issues](https://github.com/antvis/g6/issues) for bug reports or suggestions first.

To become a contributor, please follow our [contributing guide](https://github.com/antvis/g6/blob/master/CONTRIBUTING.md).
