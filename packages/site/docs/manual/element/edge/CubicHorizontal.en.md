---
title: CubicHorizontal Bezier Curve Edge
order: 3
---

## Overview

The horizontal cubic Bezier curve is a smooth curve with control points primarily distributed along the horizontal direction, suitable for connecting nodes horizontally.

Use cases:

- Suitable for horizontally laid-out graphs, such as flowcharts and hierarchical diagrams.

- Use when emphasizing horizontal connections is needed.

> Note: When calculating control points, the distance on the x-axis is primarily considered, ignoring changes on the y-axis.

## Online Experience

<embed src="@/common/api/elements/edges/cubic-horizontal.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseEdge](/en/manual/element/edge/base-edge)

| Attribute     | Description                                                                                                          | Type                   | Default   | Required |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------- | --------- | -------- |
| curvePosition | Relative position of the control point on the line connecting the two endpoints, ranging from `0-1`.                 | number &#124; number[] | [0.5,0.5] |          |
| curveOffset   | Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending. | number &#124; number[] | [0,0]     |          |

## Example

### Built-in Horizontal Cubic Bezier Curve Edge Effect

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      port: true,
      ports: [{ placement: 'right' }, { placement: 'left' }],
    },
  },
  edge: {
    type: 'cubic-horizontal',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
    },
  },
  layout: {
    type: 'antv-dagre',
    rankdir: 'LR',
    nodesep: 20,
    ranksep: 120,
  },
});

graph.render();
```
