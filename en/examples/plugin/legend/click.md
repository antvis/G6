---
title: "Click legend"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/plugin/legend/click/"
version: "5.1.1"
---

# Click legend

[Live example](https://g6.antv.antgroup.com/en/examples/plugin/legend/click/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: '2', type: 'rect', data: { cluster: 'node-type2' } },
    { id: '3', type: 'triangle', data: { cluster: 'node-type3' } },
    { id: '4', type: 'diamond', data: { cluster: 'node-type4' } },
  ],
  edges: [
    { source: '1', target: '2', type: 'quadratic', data: { cluster: 'edge-type1' } },
    { source: '1', target: '4', data: { cluster: 'edge-type2' } },
    { source: '3', target: '4' },
    { source: '2', target: '4', data: { cluster: 'edge-type3' } },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: { size: 32 },
    palette: { field: 'cluster' },
  },
  edge: {
    palette: { field: 'cluster' },
  },
  layout: {
    type: 'force',
  },
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      trigger: 'click',
      gridRow: 1,
      gridCol: 4,
      itemLabelFontSize: 12,
    },
  ],
});

graph.render();
```
