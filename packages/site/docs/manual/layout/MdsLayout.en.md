---
title: MDS High-dimensional Data Dimensionality Reduction Layout
order: 17
---

# MDS High-dimensional Data Dimensionality Reduction Layout

## Overview

MDS (Multidimensional Scaling) is a classic dimensionality reduction algorithm. In G6, the MDS layout constructs a distance matrix between nodes and restores their relative distances in high-dimensional space as much as possible in 2D space. It is suitable for graph visualization scenarios that show similarity, distance, or structural relationships between nodes.

## Use Cases

- Data dimensionality reduction visualization
- Displaying distance relationships between nodes

## Configuration

```js
const graph = new Graph({
  layout: {
    type: 'mds',
    center: [300, 300],
    linkDistance: 100,
  },
});
```

## Options

| Option           | Description                            | Type              | Default | Required |
| :--------------- | :------------------------------------- | :---------------- | :------ | :------- |
| **type**         | Layout type                            | `mds`             | -       | Yes      |
| **center**       | Center position of the circular layout | `[number,number]` | [0,0]   | No       |
| **linkDistance** | Ideal length of edges (spring length)  | `number`          | 50      | No       |

**center**

The center coordinates of the layout. All nodes will be symmetrically distributed around this point.

**linkDistance**

> number Default: 50

The ideal distance between nodes. The larger the value, the more dispersed the nodes.

## Code Example

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: Array.from({ length: 25 }, (_, i) => ({
    id: `node-${i}`,
    data: {
      value: Math.random() * 100,
    },
  })),
  edges: Array.from({ length: 20 }, (_, i) => ({
    id: `edge-${i}`,
    source: `node-${Math.floor(Math.random() * 25)}`,
    target: `node-${Math.floor(Math.random() * 25)}`,
  })),
};

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
  autoFit: 'view',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'mds',
    nodeSize: 32,
    linkDistance: 100,
  },
  behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
});

graph.render();
```
