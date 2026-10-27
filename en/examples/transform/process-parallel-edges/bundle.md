---
title: "Bundle Mode"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/transform/process-parallel-edges/bundle/"
version: "5.1.1"
---

# Bundle Mode

[Live example](https://g6.antv.antgroup.com/en/examples/transform/process-parallel-edges/bundle/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'A', style: { x: 50, y: 350 } },
    { id: 'B', style: { x: 250, y: 150 } },
    { id: 'C', style: { x: 450, y: 350 } },
  ],
  edges: [
    { source: 'A', target: 'C' },
    { source: 'C', target: 'A' },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: `edge:A-B${i}`,
      source: 'A',
      target: 'B',
      data: {
        label: `A->B:${i}`,
      },
    })),
    ...Array.from({ length: 5 }).map((_, i) => ({
      id: `edge:B-C${i}`,
      source: 'B',
      target: 'C',
      data: {
        label: `B->C:${i}`,
      },
    })),
  ],
};

const graph = new Graph({
  container: 'container',
  autoFit: 'center',
  data,
  node: {
    style: {
      ports: [{ placement: 'center' }],
      labelText: (d) => d.id,
    },
  },
  edge: {
    style: {
      labelText: (d) => d?.data?.label || `${d.source}->${d.target}`,
    },
  },
  behaviors: ['drag-element'],
  transforms: ['process-parallel-edges'],
});

graph.render();
```
