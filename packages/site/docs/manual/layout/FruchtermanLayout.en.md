---
title: Fruchterman Force-directed Layout
order: 14
---

## Overview

The Fruchterman layout is a force-directed layout based on the algorithm from [Graph Drawing by Force-directed Placement](https://www.mathe2.uni-bayreuth.de/axel/papers/reingold:graph_drawing_by_force_directed_placement.pdf). By flexibly configuring parameters to simulate physical forces, the layout automatically reaches a stable equilibrium state with minimal energy. It supports both basic uniform distribution and cluster layouts. See more Fruchterman force-directed layout [examples](/en/examples#layout-fruchterman) and [source code](https://github.com/antvis/layout/blob/v5/packages/layout/src/fruchterman.ts).

## Use Cases

- Basic uniform distribution: Suitable for displaying network graphs with evenly distributed nodes and clear overall structure, such as network topology and knowledge graphs.
- Cluster layout: Suitable for visualizing data with internal aggregation or grouping, such as community structure display and association group analysis.

## Options

| Property | Description                                                                                                                                                                                        | Type                                                                                                       | Default          | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| type     | Layout type                                                                                                                                                                                        | `'fruchterman'`                                                                                            | -                | ✓        |
| height   | Layout height                                                                                                                                                                                      | `number`                                                                                                   | container height |          |
| width    | Layout width                                                                                                                                                                                       | `number`                                                                                                   | container width  |          |
| gravity  | Central force, i.e., the force attracting all nodes to the [center](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L915). The larger the value, the more compact the layout | `number`                                                                                                   | 10               |          |
| speed    | Node movement speed per iteration. Too high a speed may cause strong oscillation                                                                                                                   | `number`                                                                                                   | 5                |          |
| onTick   | Callback for each iteration                                                                                                                                                                        | (data: [LayoutMapping](https://github.com/antvis/layout/blob/v5/packages/layout/src/types.ts#L69)) => void | -                |          |

### Cluster Layout

| Property       | Description                                                                               | Type      | Default     | Required |
| -------------- | ----------------------------------------------------------------------------------------- | --------- | ----------- | -------- |
| clustering     | Whether to use cluster layout                                                             | `boolean` | `false`     |          |
| nodeClusterBy  | Field name in node data for clustering, effective when `clustering` is true               | `string`  | `'cluster'` |          |
| clusterGravity | Gravity within clusters, affects cluster compactness, effective when `clustering` is true | `number`  | 10          |          |

## Example Code

### Basic Layout

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 500,
  height: 250,
  data: {
    nodes: [
      { id: '0' },
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
      { id: '6' },
      { id: '7' },
      { id: '8' },
      { id: '9' },
      { id: '10' },
    ],
    edges: [
      { source: '0', target: '1' },
      { source: '0', target: '2' },
      { source: '0', target: '3' },
      { source: '0', target: '4' },
      { source: '0', target: '7' },
      { source: '0', target: '8' },
      { source: '0', target: '9' },
      { source: '0', target: '10' },
      { source: '2', target: '3' },
      { source: '4', target: '5' },
      { source: '4', target: '6' },
      { source: '5', target: '6' },
      { source: '9', target: '10' },
    ],
  },
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'fruchterman',
    gravity: 5,
    speed: 5,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

<details><summary>Show full code</summary>

```javascript
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '0', target: '3' },
    { source: '0', target: '4' },
    { source: '0', target: '7' },
    { source: '0', target: '8' },
    { source: '0', target: '9' },
    { source: '0', target: '10' },
    { source: '2', target: '3' },
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '5', target: '6' },
    { source: '9', target: '10' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'fruchterman',
    gravity: 5,
    speed: 5,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

</details>

### Cluster Layout

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 500,
  height: 250,
  data: {
    nodes: [
      { id: '0', data: { cluster: 'a' } },
      { id: '1', data: { cluster: 'a' } },
      { id: '2', data: { cluster: 'a' } },
      { id: '3', data: { cluster: 'a' } },
      { id: '4', data: { cluster: 'a' } },
      { id: '5', data: { cluster: 'b' } },
      { id: '6', data: { cluster: 'b' } },
      { id: '7', data: { cluster: 'b' } },
      { id: '8', data: { cluster: 'c' } },
      { id: '9', data: { cluster: 'c' } },
      { id: '10', data: { cluster: 'c' } },
    ],
    edges: [
      { source: '0', target: '1' },
      { source: '0', target: '2' },
      { source: '0', target: '4' },
      { source: '0', target: '6' },
      { source: '2', target: '3' },
      { source: '2', target: '4' },
      { source: '3', target: '4' },
      { source: '5', target: '6' },
      { source: '6', target: '7' },
      { source: '7', target: '8' },
      { source: '8', target: '9' },
      { source: '8', target: '10' },
    ],
  },
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => `${d.data.cluster}-${d.id}`,
    },
    palette: {
      type: 'group',
      field: 'cluster',
    },
  },
  edge: {
    style: {
      endArrow: true,
    },
  },
  layout: {
    type: 'fruchterman',
    gravity: 6,
    speed: 5,

    // Cluster layout parameters
    clustering: true,
    nodeClusterBy: 'cluster',
    clusterGravity: 3,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

<details><summary>Show full code</summary>

```javascript
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '0', data: { cluster: 'a' } },
    { id: '1', data: { cluster: 'a' } },
    { id: '2', data: { cluster: 'a' } },
    { id: '3', data: { cluster: 'a' } },
    { id: '4', data: { cluster: 'a' } },
    { id: '5', data: { cluster: 'b' } },
    { id: '6', data: { cluster: 'b' } },
    { id: '7', data: { cluster: 'b' } },
    { id: '8', data: { cluster: 'c' } },
    { id: '9', data: { cluster: 'c' } },
    { id: '10', data: { cluster: 'c' } },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '0', target: '4' },
    { source: '0', target: '6' },
    { source: '2', target: '3' },
    { source: '2', target: '4' },
    { source: '3', target: '4' },
    { source: '5', target: '6' },
    { source: '6', target: '7' },
    { source: '7', target: '8' },
    { source: '8', target: '9' },
    { source: '8', target: '10' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => `${d.data.cluster}-${d.id}`,
    },
    palette: {
      type: 'group',
      field: 'cluster',
    },
  },
  edge: {
    style: {
      endArrow: true,
    },
  },
  layout: {
    type: 'fruchterman',
    gravity: 6,
    speed: 5,

    // Cluster layout parameters
    clustering: true,
    nodeClusterBy: 'cluster',
    clusterGravity: 3,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

</details>
