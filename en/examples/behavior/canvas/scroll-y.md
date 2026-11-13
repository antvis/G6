---
title: "Scroll Y"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/behavior/canvas/scroll-y/"
version: "5.1.1"
---

# Scroll Y

[Live example](https://g6.antv.antgroup.com/en/examples/behavior/canvas/scroll-y/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
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
  behaviors: [{ type: 'scroll-canvas', direction: 'y' }],
});

graph.render();
```
