---
title: "Snake Layout with Gutter"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/snake/gutter/"
version: "5.1.1"
---

# Snake Layout with Gutter

[Live example](https://g6.antv.antgroup.com/en/examples/layout/snake/gutter/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(16).fill(0).map((_, i) => ({ id: `${i}` })),
  edges: new Array(15).fill(0).map((_, i) => ({ source: `${i}`, target: `${i + 1}` })),
};

const graph = new Graph({
  container: 'container',
  autoFit: 'center',
  data,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'snake',
    cols: 3,
    rowGap: 80,
    colGap: 120,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```
