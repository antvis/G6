# G6: A Graph Visualization Framework in TypeScript

> The 5.0 beta version is currently undergoing rapid iteration, with the stable release expected on June 6, 2024. There may be changes to the API during this period, so please exercise caution when using it in stable online product.

![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![travis-ci](https://img.shields.io/travis/antvis/g6/master.svg)](https://travis-ci.org/antvis/g6) [![codecov](https://codecov.io/gh/antvis/G6/branch/master/graph/badge.svg)](https://codecov.io/gh/antvis/G6) ![typescript](https://img.shields.io/badge/language-typescript-red.svg) ![MIT](https://img.shields.io/badge/license-MIT-000000.svg) [![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6) [![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 "Percentage of issues still open")

[中文 README](README.md)

## What is G6

[G6](https://github.com/antvis/g6) is a graph visualization engine, which provides a set of basic mechanisms, including rendering, layout, analysis, interaction, animation, and other auxiliary tools. G6 aims to simplify the relationships, and help people to obtain the insight of relational data.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='' />

Developers are able to build graph visualization **analysis** applications or graph visualization **modeling** applications easily.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zau8QJcVpDQAAAAAAAAAAABkARQnAQ' height=200 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RIlETY_S6IoAAAAAAAAAAABkARQnAQ' height=200 alt='' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cDzXR4jIWr8AAAAAAAAAAABkARQnAQ' height=150 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DifbSahOblAAAAAAAAAAAABkARQnAQ' height=150 alt='' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HTasSJGC4koAAAAAAAAAAABkARQnAQ' height=150 alt='' />

> Powerful Animation and Interactions

<img src="https://user-images.githubusercontent.com/6113694/44995293-02858600-afd5-11e8-840c-349e4730d63d.gif" height=150 alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*I9OdTbXJIi0AAAAAAAAAAABkARQnAQ" height=150 alt='' /><img src="https://user-images.githubusercontent.com/6113694/44995332-2ba61680-afd5-11e8-8cab-db0e9d08ceb7.gif" height=150 alt='' />

<img src="https://gw.alipayobjects.com/zos/rmsportal/HQxYguinFOMIXrGQOABY.gif" height=150 alt='' /><img src="https://gw.alipayobjects.com/zos/rmsportal/nAugyFgrbrUWPmDIDiQm.gif" height=150 alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xoufSYcjK2AAAAAAAAAAAABkARQnAQ" height=150 alt='' />

> Powerful Layouts

## Features (5.0 Alpha)

- Extensionable: All the modules (seven types) are integrated as plugins;
- Style and animation standards, supports level of details (see the graph below);
- Beautiful Built-in Theme and cound be customized (see the graph below);
- Layouts with Great Performance: More than 10 layout algorithms, supports GPU and Rust parallel computing, and custom layouts;
- Steerable Interactions: More than 10 basic interaction behaviors ;
- Friendly User Experience: Complete documents for different levels of user requirements. TypeScript supported.
- Multiple renderers: Canvas, SVG, WebGL;
- 3D Graph:

The gif is not fully loaded, [Click Here to See the Original Image](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qPrmQrdV77gAAAAAAAAAAAAADmJ7AQ/original)

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IUOnSbLisyoAAAAAAAAAAAAADmJ7AQ/original" width=600 height=334 alt='' />

> 3D Graph

The gif is not fully loaded, [Click Here to See the Original Image](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1BFvQ4r3P7UAAAAAAAAAAAAADmJ7AQ/original)

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tPPGSokdSYsAAAAAAAAAAAAADmJ7AQ/original" width=600 height=367 alt='' />

> Animations and Level of Details

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QjJoSbD7GTwAAAAAAAAAAAAADmJ7AQ/original" width=800 height=226 alt='' />

> Built-in Themes and Custom Themes

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*x7NTT5_baKYAAAAAAAAAAAAADmJ7AQ/original" width=400 height=218 alt='' />

> Seven Types of Plugins

- (TODO: migrate from v4) Abundant Built-in Items: Nodes and edges with free configurations;
- (TODO: migrate from v4) Convenient Components: Outstanding ability and performance;

G6 concentrates on the principle of 'good by default'. In addition, the custom mechanism of the item, interaction behavior, and layout satisfies the customazation requirements.

> Abundant Built-in Items

## Installation (5.0 Alpha)

```bash
$ npm install @antv/g6@5.0.0-beta.28
```

## Usage (5.0 Alpha)

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M-MTRaLiZN0AAAAAAAAAAAAADmJ7AQ/original" width=437 height=148 alt='' />

The configuration specification of the graph can be refered to: https://github.com/antvis/G6/blob/v5/packages/g6/src/types/spec.ts

Graph API: https://github.com/antvis/G6/blob/2b44df189dd2e851447ba5a09541c372b49cd658/packages/g6/src/types/graph.ts#L23

A simple graph demo:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M-MTRaLiZN0AAAAAAAAAAAAADmJ7AQ/original" width=437 height=138 alt='' />

[![Edit compassionate-lalande-5lxm7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/musing-matan-q255po?fontsize=14&hidenavigation=1&theme=dark)

```js
import { Graph } from "@antv/g6";

const data = {
  nodes: [
    {
      id: "node1",
      label: "Node 1",
      data: {
        x: 150,
        y: 150,
      },
    },
    {
      id: "node2",
      label: "Node 2",
      data: {
        x: 400,
        y: 150,
      },
    },
  ],
  edges: [
    {
      id: "edge1",
      label: "Edge 1",
      source: "node1",
      target: "node2",
      data: {},
    },
  ],
};

const graph = new Graph({
  container: "container",
  width: 500,
  height: 500,
  data,
  node: (innerModel) => ({
    ...innerModel,
    type: "circle",
    data: {
      ...innerModel.data,
      labelShape: {
        text: innerModel.label,
      },
      labelBackgroundShape: {},
      iconShape: {
        img: "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
      },
    },
  }),
  edge: (innerModel) => ({
    ...innerModel,
    type: "line",
    data: {
      labelShape: {
        text: innerModel.label,
      },
      labelBackgroundShape: {},
    },
  }),
});
```

## Development (5.0 Alpha)

```bash
# install dependencies by pnpm in the root directory
$ pnpm install

# enter packages/g6
$ cd ./packages/g6

# build g6
$ npm run build

# start the integration demos
$ npm run dev

# run test case
$ npm run test

# run test case in watch mode
npm test -- --watch ./tests/unit/node-spec
DEBUG_MODE=1 npm test -- --watch ./tests/unit/node-spec
```

## Documents (5.0 Alpha)

The documents will be ready after the 5.0 version being stable.

## How to Contribute

Please let us know what you are you going to help. Do check out [issues](https://github.com/antvis/g6/issues) for bug reports or suggestions first.

## License

[MIT license](./LICENSE).
