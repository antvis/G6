---
title: "Drag Fixed Nodes"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/force-directed/drag-fixed/"
version: "5.1.1"
---

# Drag Fixed Nodes

[Live example](https://g6.antv.antgroup.com/en/examples/layout/force-directed/drag-fixed/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(10).fill(0).map((_, i) => ({ id: `${i}`, label: `${i}` })),
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '0', target: '3' },
    { source: '0', target: '4' },
    { source: '0', target: '5' },
    { source: '0', target: '7' },
    { source: '0', target: '8' },
    { source: '0', target: '9' },
    { source: '2', target: '3' },
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '5', target: '6' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.label,
      labelPlacement: 'middle',
      labelFill: '#fff',
    },
  },
  layout: {
    type: 'd3-force',
    link: {
      distance: 100,
      strength: 2,
    },
    collide: {
      radius: 40,
    },
  },
  behaviors: [
    {
      type: 'drag-element-force',
      fixed: true,
    },
  ],
});

graph.render();
```
