---
title: "Orthogonal Line"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/element/edge/polyline-orth/"
version: "5.1.1"
---

# Orthogonal Line

[Live example](https://g6.antv.antgroup.com/en/examples/element/edge/polyline-orth/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 200, y: 200 } },
    { id: 'node-2', style: { x: 350, y: 120 } },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'polyline',
    style: {
      router: {
        type: 'orth',
      },
    },
  },
  behaviors: [{ type: 'drag-element' }],
});

graph.render();
```
