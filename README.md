# G6: A Graph visualization framework in JavaScript.
![](https://gw.alipayobjects.com/zos/rmsportal/eWLVJWtDPsdREBKYYvfA.png)

![](https://img.shields.io/badge/language-javascript-red.svg)

[中文 README](README-zh_CN.md)

G6 is a graph visualization framework. It provides a set of base mechanisms, help developers to build your own graph visualization **analysis** application or graph visualization **edit** application.

[Full documentation](https://www.yuque.com/antv/g6-en)


<img src="https://cdn.nlark.com/yuque/0/2018/gif/93506/1535804360170-d3c64356-38d9-40af-a111-b39c8232e67e.gif" height=150><img src="https://cdn.nlark.com/yuque/0/2018/gif/93506/1535955277773-840190f8-836a-4bd6-875a-b3a18e6cebf1.gif" height=150><img src="https://gw.alipayobjects.com/zos/rmsportal/oJPPdGVFfHpJuEtgPqpw.gif" height=150>

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" height=150><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" height=150>

## [G6-Editor](https://yuque.com/antv/g6-editor)

<img src="https://gw.alipayobjects.com/zos/rmsportal/nzmycBewjfxKDbepTDlT.gif" width=560>
<img src="https://gw.alipayobjects.com/zos/rmsportal/WVqnbgJmamdahbAuDpBL.gif" width=560>

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
