---
title: Introduction
order: 0
redirect_from:
  - /en/docs/manual
---

<img src="https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png" height="250" alt="g6 banner" />

[![](https://img.shields.io/travis/antvis/g6.svg)](https://travis-ci.org/antvis/g6) [![Coverage Status](https://coveralls.io/repos/github/antvis/G6/badge.svg)](https://coveralls.io/github/antvis/G6) ![](https://img.shields.io/badge/language-javascript-red.svg) ![](https://img.shields.io/badge/license-MIT-000000.svg) [![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6) [![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 'Percentage of issues still open')

[中文简介](/zh/docs/manual/introduction/)

## What is G6

<a href='https://github.com/antvis/g6' target='_blank'>G6</a> is a graph visualization engine, which provides a set of basic mechanisms, including rendering, layout, analysis, interaction, animation, and other auxiliary tools. G6 aims to simplify the complex relationships, and help people to obtain the insight of relational data.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='img'/>

Developers are able to build graph visualization **analysis** applications or graph visualization **modeling** applications easily.

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150 alt='img' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*I9OdTbXJIi0AAAAAAAAAAABkARQnAQ" height=150 alt='img' /><img src="https://user-images.githubusercontent.com/6113694/44995332-2ba61680-afd5-11e8-8cab-db0e9d08ceb7.gif" height=150 alt='img' />

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" height=150 alt='img' /><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" height=150 alt='img' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xoufSYcjK2AAAAAAAAAAAABkARQnAQ" height=150 alt='img' />

> Powerful Layouts

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dJT3SIVta6QAAAAAAAAAAABkARQnAQ' width=800 alt='img'/>

> Powerful Animation and Interactions

## Features

- Excellent Perforamnce: Supports large graph visualization and interactive exploration;
- Abundant Built-in Items: Nodes and edges with free configurations;
- Steerable Interactions: More than 10 basic interaction behaviors ;
- Powerful Layouts: More than 10 layout algorithms;
- Convenient Components: Outstanding abilities and performance;
- Friendly User Experience: Complete documents for different levels of requirements. TypeScript supported.

G6 concentrates on the principle of 'good by default'. In addition, the custom mechanism of the item, interation behavior, and layout satisfies the customization requirements.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Y0c6S7cxjVkAAAAAAAAAAABkARQnAQ' width=800 alt='img'/>

> Abundant Built-in Items

## Installation

```bash
$ npm install @antv/g6
```

## Usage

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*srtDT5slbN8AAAAAAAAAAABkARQnAQ' width=400 alt='img' />

```javascript
// The source data
const data = {
  // The array of nodes
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
  // The array of edges
  edges: [
    // An edge links from node1 to node2
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// Instantiate the Graph
const graph = new G6.Graph({
  container: 'mountNode', // The container id or HTML node of the graph canvas.
  // The width and the height of graph canvas
  width: 800,
  height: 500,
});
// Load the data
graph.data(data);
// Render the graph
graph.render();
```

[![Edit compassionate-lalande-5lxm7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/compassionate-lalande-5lxm7?fontsize=14&hidenavigation=1&theme=dark)

For more information about the usage, please refer to [Getting Started](/en/docs/manual/getting-started).

## Documents

- [Tutorial](/en/docs/manual/tutorial/preface)
- [Key Concepts](/en/docs/manual/middle/graph)
- [Further Reading](/en/docs/manual/advanced/coordinate-system)
- [API Reference](/en/docs/api/Graph)

## Links

Official independent product: Graphin

Graphin stands for Graph Insight. It's a toolkit based on G6 and React, that focuses on relational visual analysis. It's simple, efficient, out of the box.

- github: https://github.com/antvis/Graphin
- website: https://graphin.antv.vision

Some implementations combined with front-end libraries from the third party:

- <a href='https://github.com/guozhaolong/wfd' target='_blank'>Flow visualization editor powered by G6 and React - Workflow Designer</a>;
- <a href='https://github.com/caoyu48/vue-g6-editor' target='_blank'>Visualization editor powered by G6 and Vue</a>;
- <a href='https://github.com/OXOYO/X-Flowchart-Vue' target='_blank'>Visualization and graphics editor powered by G6 and Vue - A visual graph editor based on G6 and Vue</a>
- <a href='https://github.com/lusess123/web-pdm' target='_blank'>Visualization and graphics ER editor powered by G6 and React</a>；
- <a href='https://github.com/dappsnation/ng-antv' target='_blank'>Visualization and graphics editor powered by G6 and Angular</a>
- <a href='https://github.com/claudewowo/welabx-g6' target='_blank'>Visualization Flow editor powered by G6 and Vue</a>

## G6 Communication Group

Welcome to join the **G6 Communication Group** or **G6 Communication Group-2** (DingTalk groups). We also welcome the github issues.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-RO_R7SCvroAAAAAAAAAAAAAARQnAQ' width=400 alt="">

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hzfaSrAj0jkAAAAAAAAAAABkARQnAQ' width=400 alt="">

## How to Contribute

Please let us know what you are you going to help. Do check out <a href='https://github.com/antvis/g6/issues' target='_blank'>issues</a> for bug reports or suggestions first.

## License

<a href='https://github.com/antvis/g6/blob/master/LICENSE' target='_blank'>MIT license</a>.
