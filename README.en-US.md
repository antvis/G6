<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.md)

<h1 align="center">
<b>G6: A Graph Visualization Framework in TypeScript</b>
</h1>

![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![npm Version](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6)
[![Build Status](https://github.com/antvis/g6/workflows/build/badge.svg?branch=v5)](https://github.com/antvis/g6/actions)
[![Coverage Status](https://coveralls.io/repos/github/antvis/G6/badge.svg)](https://coveralls.io/github/antvis/G6)
[![npm Download](https://img.shields.io/npm/dm/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6)
![typescript](https://img.shields.io/badge/language-typescript-blue.svg)
[![npm License](https://img.shields.io/npm/l/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6)

<p align="center">
  <a href="https://g6.antv.antgroup.com/">Introduction</a> •
  <a href="https://g6.antv.antgroup.com/examples">Examples</a> •
  <a href="https://g6.antv.antgroup.com/">Tutorial</a> •
  <a href="https://g6.antv.antgroup.com/">API</a>
</p>

[G6](https://github.com/antvis/g6) is a graph visualization engine. It provides basic capabilities for graph visualization and analysis such as drawing, layout, analysis, interaction, animation, themes, and plugins. With G6, users can quickly build their own graph visualization and analysis applications, making relational data simple, transparent, and meaningful.

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_PJ5SZELwq0AAAAAAAAAAAAADmJ7AQ/original' width=550 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zau8QJcVpDQAAAAAAAAAAABkARQnAQ' height=200 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RIlETY_S6IoAAAAAAAAAAABkARQnAQ' height=200 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cDzXR4jIWr8AAAAAAAAAAABkARQnAQ' height=150 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HTasSJGC4koAAAAAAAAAAABkARQnAQ' height=150 alt='' />

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150 alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*I9OdTbXJIi0AAAAAAAAAAABkARQnAQ" height=150 alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xoufSYcjK2AAAAAAAAAAAABkARQnAQ" height=150 alt='' />

## ✨ Features

G6, as a professional graph visualization engine, boasts the following features:

- **Rich Elements**: It comes with a variety of built-in node, edge, and Combo UI elements with extensive style configurations, supports data callbacks, and has a flexible mechanism for extending custom elements.
- **Controllable Interactions**: It includes more than 10 built-in interaction behaviors and offers a rich array of events, facilitating the expansion of custom interactive behaviors.
- **High-Performance Layout**: The engine features more than 10 common graph layouts, some of which leverage GPU and Rust parallel computing for enhanced performance, and it supports custom layout development.
- **Convenient Plugins**: Optimized built-in plugin functionality and performance, with flexible extensibility, making it easier to implement customized business capabilities.
- **Multiple Theme and Palettes**: Provides two sets of built-in themes, light and dark, that integrate over 20 popular community color palettes based on the AntV new color scheme.
- **Multi-Environment Rendering**: Harnessing the power of [G](https://github.com/antvis/g), it supports rendering in Canvas, SVG, and WebGL, as well as server-side rendering with Node.js; it also offers plugin packages that provide powerful 3D rendering and spatial interactions based on WebGL.
- **React Ecosystem**: By utilizing the React front-end ecosystem, it supports React nodes, significantly enriching the presentational styles of G6 nodes.

## 🔨 Getting Started

G6 is usually installed via a package manager such as npm or Yarn.

```bash
$ npm install @antv/g6
```

The `Graph` object then can be imported from G6.

```html
<div id="container"></div>
```

```ts
import { Graph } from '@antv/g6';

// Get the Data.
const data = {
  nodes: [
    /* your nodes data */
  ],
  edges: [
    /* your edges data */
  ],
};

// Create the Graph instance.
const graph = new Graph({
  container: 'container',
  data,
  node: {
    palette: {
      type: 'group',
      field: 'cluster',
    },
  },
  layout: {
    type: 'force',
  },
  behaviors: ['drag-canvas', 'drag-node'],
});

// Render the Graph.
graph.render();
```

All goes well, you can get the following lovely graph!

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ue4iTYurc6sAAAAAAAAAAAAADmJ7AQ/fmt.webp" height="300" />

## 🌍 Ecosystem

- **Ant Design Charts**: A React chart library based on G2, G6, X6, L7.
- **Graphin**: A simple React wrapper based on G6, as well as an SDK for developing graph visualization applications.

For more ecosystem open-source projects, contributions are welcome. Please feel free to submit a PR for inclusion.

## 📮 Contributing

- **Issue Reporting**: If you encounter any issues with G6 during use, please feel free to submit an issue, along with the minimal sample code that can reproduce the problem.
- **Contribution Guide**: Information on how to get involved in the [development and contribution](https://g6.antv.antgroup.com/en/manual/contribute) to G6.
- **Ideas Discussion**: Discuss your ideas on GitHub Discussions or in the DingTalk group.

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*CQoGSoFBzaUAAAAAAAAAAAAADmJ7AQ/fmt.webp" height="256" />
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yXJGSY8RC68AAAAAAAAAAAAADmJ7AQ/fmt.webp" height="256" />
</div>

## 📄 License

[MIT](./LICENSE).
