---
title: ForceAtlas2 Force-directed Layout
order: 12
---

## Overview

ForceAtlas2 is a force-directed layout algorithm that optimizes node positions by simulating forces in a physical system. This layout is especially suitable for visualizing large-scale network data, effectively revealing relationships and cluster structures among nodes.

## Use Cases

- Social network analysis: Display user relationship networks, with node degree reflecting user influence
- Knowledge graphs: Show associations between concepts, discover knowledge domains through clustering
- System architecture diagrams: Show dependencies between system components, highlight core components via hub mode

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

## Options

| Property       | Description                                                                                                                                                                   | Type                            | Default  | Required |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- | -------- |
| type           | Layout type, must be `force-atlas2`                                                                                                                                           | `force-atlas2`                  | -        | ✓        |
| barnesHut      | Whether to enable quadtree acceleration. When enabled, improves performance for large graphs but may affect layout quality. By default, enabled if node count > 250.          | boolean                         | -        |          |
| dissuadeHubs   | Whether to enable hub mode. If true, nodes with higher in-degree are more likely to be placed at the center than those with high out-degree                                   | boolean                         | false    |          |
| height         | Layout height. Defaults to container height                                                                                                                                   | number                          | -        |          |
| kg             | Gravity coefficient. The larger the value, the more concentrated the layout is at the center                                                                                  | number                          | 1        |          |
| kr             | Repulsion coefficient. Adjusts the compactness of the layout. The larger the value, the looser the layout                                                                     | number                          | 5        |          |
| ks             | Controls the speed of node movement during iteration                                                                                                                          | number                          | 0.1      |          |
| ksmax          | Maximum node movement speed during iteration                                                                                                                                  | number                          | 10       |          |
| mode           | Clustering mode. In `linlog` mode, clusters are more compact                                                                                                                  | `normal` \| `linlog`            | `normal` |          |
| nodeSize       | Node size (diameter). Used for repulsion calculation when `preventOverlap` is enabled. If not set, uses `data.size` in node data                                              | Size \| ((node?: Node) => Size) | -        |          |
| onTick         | Callback for each iteration                                                                                                                                                   | (data: LayoutMapping) => void   | -        |          |
| preventOverlap | Whether to prevent node overlap. When enabled, layout considers node size to avoid overlap. Node size is specified by `nodeSize` or `data.size` in node data                  | boolean                         | false    |          |
| prune          | Whether to enable auto-pruning. By default, enabled if node count > 100. Pruning speeds up convergence but may reduce layout quality. Set to false to disable auto-activation | boolean                         | -        |          |
| tao            | Tolerance for stopping oscillation when layout is near convergence                                                                                                            | number                          | 0.1      |          |
| width          | Layout width. Defaults to container width                                                                                                                                     | number                          | -        |          |
| center         | Layout center, format [x, y]. Each node is attracted to this point, gravity controlled by `kg`. If not set, uses canvas center                                                | [number, number]                | -        |          |

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

Result:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 300,
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
});

graph.render();
```

## Real Example

```js | ob { inject: true }
import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      layout: {
        type: 'force-atlas2',
        preventOverlap: true,
        kr: 20,
        center: [250, 250],
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
      autoResize: true,
      zoomRange: [0.1, 5],
    });

    graph.render();
  });
```

- [ForceAtlas2 Layout](/en/examples/layout/force-directed/#atlas2)
