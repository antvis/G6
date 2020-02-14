# G6: A Graph Visualization Framework in TypeScript.

![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6) [![Coverage Status](https://coveralls.io/repos/github/antvis/G6/badge.svg)](https://coveralls.io/github/antvis/G6) ![](https://img.shields.io/badge/language-javascript-red.svg) ![](https://img.shields.io/badge/license-MIT-000000.svg) [![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6) [![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 'Percentage of issues still open')

[中文 README](README-zh_CN.md)

G6 is a graph visualization framework which provides a set of basic mechanisms, including rendering, layout, interaction, animation, analysis, and other auxiliary tools. Developers are able to build graph visualization **analysis** applications or graph visualization **modeling** applications easily. For more details, please see our [doc](https://www.yuque.com/antv/g6/intro).

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150><img src="https://cdn.nlark.com/yuque/0/2018/gif/93506/1535955277773-840190f8-836a-4bd6-875a-b3a18e6cebf1.gif" height=150><img src="https://user-images.githubusercontent.com/6113694/44995332-2ba61680-afd5-11e8-8cab-db0e9d08ceb7.gif" height=150>

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" height=150><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" height=150><img src="https://cdn.nlark.com/yuque/0/2019/gif/174835/1552990627466-92a4ce23-79b2-4930-ab05-6478b56ce880.gif" height=150>

## Installation

```bash
$ npm install @antv/g6
```

## Usage

<img src="https://gw.alipayobjects.com/zos/rmsportal/qSUOQUhnRrHCLvEjhZGP.png" />

```js
import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 200,
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
    },
  ],
  edges: [
    {
      target: 'node2',
      source: 'node1',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  defaultNode: {
    type: 'circle',
    style: {
      fill: '#40a9ff',
      stroke: '#096dd9',
    },
  },
  nodeStateStyles: {
    hover: {
      lineWidth: 3,
    },
    select: {
      lineWidth: 5,
    },
  },
});
graph.data(data);
graph.render();
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

## License

[MIT license](./LICENSE).
