---
title: EdgeBundling
order: 4
---

## Overview

Edge bundling is a graph visualization technique used to reduce visual clutter in complex network graphs and to reveal high-level patterns and structures in the graph. Its purpose is to bundle adjacent edges together.

The edge bundling plugin provided in G6 is based on the implementation of the [FEDB (Force-Directed Edge Bundling for Graph Visualization)](https://classes.engineering.wustl.edu/cse557/readings/holten-edgebundling.pdf) paper: modeling edges as flexible springs that can attract each other and bundling them through a self-organizing process.

## Use Cases

The edge bundling plugin is mainly suitable for the following scenarios:

- Reducing visual clutter in complex network graphs
- Revealing high-level patterns and structures in the graph
- Improving the readability and aesthetics of large-scale graph data

## Basic Usage

Below is a simple example of initializing the EdgeBundling plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-bundling',
      bundleThreshold: 0.6,
      cycles: 6,
      divisions: 3,
      divRate: 2,
      iterations: 90,
      iterRate: 2 / 3,
      K: 0.1,
      lambda: 0.1,
    },
  ],
});
```

## Configuration Options

| Property        | Description                                                                                                                                                                                            | Type   | Default Value   | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | --------------- | -------- |
| type            | Plugin type, used to identify the plugin as an edge bundling plugin                                                                                                                                    | string | `edge-bundling` | ✓        |
| key             | Unique identifier for the plugin, can be used to get the plugin instance or update plugin options                                                                                                      | string | -               |          |
| bundleThreshold | Edge compatibility threshold, determines which edges should be bundled together, the larger the value, the fewer edges are bundled, [example](#bundlethreshold)                                        | number | 0.6             |          |
| cycles          | Number of simulation cycles, controls the number of execution rounds of the edge bundling simulation                                                                                                   | number | 6               |          |
| divisions       | Initial number of cut points, in subsequent cycles, the number of cut points will gradually increase according to divRate, affecting the degree of edge subdivision                                    | number | 1               |          |
| divRate         | Growth rate of cut points, determines the growth rate of cut points in each cycle                                                                                                                      | number | 2               |          |
| iterations      | Specifies the number of iterations executed in the first cycle, in subsequent cycles, the number of iterations will gradually decrease according to iterRate, affecting the accuracy of the simulation | number | 90              |          |
| iterRate        | Iteration decrement rate, controls the reduction ratio of iterations in each cycle                                                                                                                     | number | 2/3             |          |
| K               | Edge strength, affects the attraction and repulsion between edges, [example](#k)                                                                                                                       | number | 0.1             |          |
| lambda          | Initial step size, in subsequent cycles, the step size will double increment, affecting the magnitude of node movement during edge bundling                                                            | number | 0.1             |          |

### bundleThreshold

Edge compatibility threshold, determines which edges should be bundled together. The larger the value, the fewer edges are bundled, and vice versa.

- A lower bundleThreshold value (e.g., 0.4) will cause more edges to be bundled together, forming a more pronounced bundling effect.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-bundling',
      bundleThreshold: 0.4, // Lower edge compatibility threshold
    },
  ],
});
```

The effect is as follows:
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_0iOSZnijrMAAAAAAAAAAAAAemJ7AQ/original" width="240" alt="Lower edge compatibility threshold">

- A higher bundleThreshold value (e.g., 0.8) will cause fewer edges to be bundled together, maintaining more independent edges.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-bundling',
      bundleThreshold: 0.8, // Higher edge compatibility threshold
    },
  ],
});
```

The effect is as follows:
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WNHMT4L4AfkAAAAAAAAAAAAAemJ7AQ/original" width="240" alt="Higher edge compatibility threshold">

### K

Edge strength, affects the attraction and repulsion between edges. A higher K value will make the attraction between edges stronger, resulting in a tighter bundling effect.

- A lower K value (e.g., 0.05) will make the attraction between edges weaker, resulting in a weaker bundling effect.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-bundling',
      K: 0.05, // Lower edge strength
    },
  ],
});
```

The effect is as follows:
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*wlHVSb2515gAAAAAAAAAAAAAemJ7AQ/original" width="240" alt="Lower edge strength">

- A higher K value (e.g., 0.2) will make the attraction between edges stronger, resulting in a more pronounced bundling effect.

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-bundling',
      K: 0.2, // Higher edge strength
    },
  ],
});
```

The effect is as follows:
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4DAMQLvtrk4AAAAAAAAAAAAAemJ7AQ/original" width="240" alt="Higher edge strength">

## Code Examples

### Basic Edge Bundling

The simplest way is to use the preset configuration directly:

```js
const graph = new Graph({
  // Other configurations...
  plugins: ['edge-bundling'],
});
```

### Custom Styles

You can customize the parameters of edge bundling as needed:

```js
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'edge-bundling',
      bundleThreshold: 0.8, // Higher edge compatibility threshold
      cycles: 8, // More simulation cycles
      K: 0.2, // Stronger edge strength
    },
  ],
});
```

### Dynamic Update of Edge Bundling

Use the key identifier to dynamically update edge bundling properties at runtime:

```js
// Initial configuration
const graph = new Graph({
  // Other configurations...
  plugins: [
    {
      type: 'edge-bundling',
      key: 'my-edge-bundling',
      bundleThreshold: 0.6,
    },
  ],
});

// Subsequent dynamic update
graph.updatePlugin({
  key: 'my-edge-bundling',
  bundleThreshold: 0.8, // Update edge compatibility threshold
  cycles: 10, // Update number of simulation cycles
});
```

## Practical Examples

```js | ob { inject: true }
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      layout: {
        type: 'circular',
      },
      node: { style: { size: 20 } },
      behaviors: ['drag-canvas', 'drag-element'],
      plugins: [
        {
          key: 'edge-bundling',
          type: 'edge-bundling',
          bundleThreshold: 0.1,
        },
      ],
    });

    graph.render();
  });
```
