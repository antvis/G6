---
title: Quadratic Bezier Curve Edge
order: 6
---

## Overview

A quadratic Bezier curve is a smooth curve whose shape is determined by a start point, an end point, and a control point.

Use cases:

- Suitable for moderately complex graphs, such as relationship graphs and network graphs.

- Use when smooth node connections are needed with limited computational resources.

## Online Experience

<embed src="@/common/api/elements/edges/quadratic.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseEdge](/en/manual/element/edge/base-edge)

| Attribute     | Description                                                                                                                                                 | Type            | Default | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- | -------- |
| controlPoints | Array of control points used to define the shape of the curve. If not specified, control points will be calculated using `curveOffset` and `curvePosition`. | [Point](#point) | -       |          |
| curvePosition | Relative position of the control point on the line connecting the two endpoints, ranging from `0-1`.                                                        | number          | 0.5     |          |
| curveOffset   | Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending.                                        | number          | 30      |          |

#### Point

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

## Example

### Built-in Quadratic Bezier Curve Edge Effect

```js | ob { inject: true }
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

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
  edge: {
    type: 'quadratic',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
      badge: true,
      badgeText: '\ue603',
      badgeFontFamily: 'iconfont',
      badgeBackgroundWidth: 12,
      badgeBackgroundHeight: 12,
    },
  },
  layout: {
    type: 'radial',
    unitRadius: 220,
    linkDistance: 220,
  },
});

graph.render();
```
