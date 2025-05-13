---
title: ForceAtlas2 Layout
---

## Overview

ForceAtlas2 is a force-directed layout algorithm that optimizes node positions by simulating forces in a physical system. This layout is particularly suitable for visualizing large-scale network data, effectively displaying relationships between nodes and cluster structures.

## Use Cases

- Social Network Analysis: Display user relationship networks, reflecting user influence through node degrees
- Knowledge Graph: Show relationships between concepts, discovering knowledge domains through clustering effects
- System Architecture: Display dependencies between system components, highlighting core components through hub mode

## Online Demo

<embed src="@/common/api/layout/force-atlas2.md"></embed>

## Basic Usage

```js
const graph = new Graph({
  layout: {
    type: 'force-atlas2',
    preventOverlap: true,
    kr: 20,
    center: [250, 250],
  },
});
```

## Configuration

| Property       | Description                                                                                                                                                                                                                                                               | Type                            | Default  | Required |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- | -------- |
| type           | Layout type, must be `force-atlas2`                                                                                                                                                                                                                                       | `force-atlas2`                  | -        | ✓        |
| barnesHut      | Whether to enable quad-tree acceleration. When enabled, it can improve performance for large graphs but may affect layout quality. By default, it will be activated when the number of nodes is greater than 250. Setting it to false will not be activated automatically | boolean                         | -        |          |
| dissuadeHubs   | Whether to enable hub mode. If true, nodes with high in-degree will have higher priority than nodes with high out-degree to be placed in the center                                                                                                                       | boolean                         | false    |          |
| height         | Layout height, default to use container height                                                                                                                                                                                                                            | number                          | -        |          |
| kg             | Gravity coefficient. The larger `kg` is, the more clustered the layout is in the center                                                                                                                                                                                   | number                          | 1        |          |
| kr             | Repulsive coefficient, used to adjust the compactness of the layout. The larger `kr` is, the more relaxed the layout is                                                                                                                                                   | number                          | 5        |          |
| ks             | Controls the speed of node movement during iteration                                                                                                                                                                                                                      | number                          | 0.1      |          |
| ksmax          | The upper limit of the maximum node movement speed during iteration                                                                                                                                                                                                       | number                          | 10       |          |
| mode           | Clustering mode. In `linlog` mode, clustering will be more compact                                                                                                                                                                                                        | `normal` \| `linlog`            | `normal` |          |
| nodeSize       | Node size (diameter). When `preventOverlap` is enabled, used for calculating repulsive forces between nodes. If not set, uses the `data.size` property from node data                                                                                                     | Size \| ((node?: Node) => Size) | -        |          |
| onTick         | Callback function for each iteration                                                                                                                                                                                                                                      | (data: LayoutMapping) => void   | -        |          |
| preventOverlap | Whether to prevent node overlap. When enabled, the layout considers node sizes to avoid overlap. Node size is specified through the `nodeSize` configuration, or through the `data.size` property in node data if `nodeSize` is not set                                   | boolean                         | false    |          |
| prune          | Whether to enable automatic pruning mode. By default, it will be activated when the number of nodes is greater than 100. Note that pruning can improve convergence speed but may reduce layout quality. Setting it to false will not be activated automatically           | boolean                         | -        |          |
| tao            | Tolerance for stopping oscillation when iteration is close to convergence                                                                                                                                                                                                 | number                          | 0.1      |          |
| width          | Layout width, default to use container width                                                                                                                                                                                                                              | number                          | -        |          |
| center         | Layout center point, used to specify the center of gravity, format as [x, y]. Each node is attracted to this center point with a force controlled by the `kg` parameter. If not set, uses the canvas center point                                                         | [number, number]                | -        |          |

## Code Example

### Basic Usage

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  layout: {
    type: 'force-atlas2',
    preventOverlap: true,
    kr: 20,
  },
  autoFit: 'view',
  data: {
    nodes: [
      { id: 'node1' },
      { id: 'node2' },
      { id: 'node3' },
      { id: 'node4' },
      { id: 'node5' },
      { id: 'node6' },
      { id: 'node7' },
      { id: 'node8' },
      { id: 'node9' },
      { id: 'node10' },
      { id: 'node11' },
      { id: 'node12' },
      { id: 'node13' },
      { id: 'node14' },
      { id: 'node15' },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
      { source: 'node5', target: 'node6' },
      { source: 'node6', target: 'node7' },
      { source: 'node7', target: 'node8' },
      { source: 'node8', target: 'node9' },
      { source: 'node9', target: 'node10' },
      { source: 'node10', target: 'node11' },
      { source: 'node11', target: 'node12' },
      { source: 'node12', target: 'node13' },
      { source: 'node13', target: 'node14' },
      { source: 'node14', target: 'node15' },
      { source: 'node15', target: 'node1' },
      { source: 'node1', target: 'node8' },
      { source: 'node2', target: 'node9' },
      { source: 'node3', target: 'node10' },
      { source: 'node4', target: 'node11' },
      { source: 'node5', target: 'node12' },
      { source: 'node6', target: 'node13' },
      { source: 'node7', target: 'node14' },
    ],
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
});
```

The effect is as follows:

```js | ob { pin: false }
createGraph(
  {
    layout: {
      type: 'force-atlas2',
      preventOverlap: true,
      kr: 20,
    },
    data: {
      nodes: [
        { id: 'node1' },
        { id: 'node2' },
        { id: 'node3' },
        { id: 'node4' },
        { id: 'node5' },
        { id: 'node6' },
        { id: 'node7' },
        { id: 'node8' },
        { id: 'node9' },
        { id: 'node10' },
        { id: 'node11' },
        { id: 'node12' },
        { id: 'node13' },
        { id: 'node14' },
        { id: 'node15' },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
        { source: 'node3', target: 'node4' },
        { source: 'node4', target: 'node5' },
        { source: 'node5', target: 'node6' },
        { source: 'node6', target: 'node7' },
        { source: 'node7', target: 'node8' },
        { source: 'node8', target: 'node9' },
        { source: 'node9', target: 'node10' },
        { source: 'node10', target: 'node11' },
        { source: 'node11', target: 'node12' },
        { source: 'node12', target: 'node13' },
        { source: 'node13', target: 'node14' },
        { source: 'node14', target: 'node15' },
        { source: 'node15', target: 'node1' },
        { source: 'node1', target: 'node8' },
        { source: 'node2', target: 'node9' },
        { source: 'node3', target: 'node10' },
        { source: 'node4', target: 'node11' },
        { source: 'node5', target: 'node12' },
        { source: 'node6', target: 'node13' },
        { source: 'node7', target: 'node14' },
      ],
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  },
  { width: 400, height: 300 },
);
```

## Real-world Examples

<Playground path="layout/force-directed/demo/atlas2.js" rid="force-atlas2-basic"></Playground>

- [ForceAtlas2 Layout](/en/examples/layout/force-directed/#atlas2)
