---
title: "Hide Elements When Dragging and Zooming"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/behavior/canvas/optimize/"
version: "5.1.1"
---

# Hide Elements When Dragging and Zooming

[Live example](https://g6.antv.antgroup.com/en/examples/behavior/canvas/optimize/)

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
  node: {
    style: {
      labelText: (datum) => datum.id,
    },
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'scroll-canvas', 'optimize-viewport-transform'],
});

graph.render();
```
