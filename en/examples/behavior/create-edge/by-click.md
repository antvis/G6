---
title: "Create Edge by Click"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/behavior/create-edge/by-click/"
version: "5.1.1"
---

# Create Edge by Click

[Live example](https://g6.antv.antgroup.com/en/examples/behavior/create-edge/by-click/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  layout: {
    type: 'grid',
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click',
      style: {
        stroke: 'red',
        lineWidth: 2,
      },
    },
  ],
});

graph.render();
```
