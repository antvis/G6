---
title: "Arrows"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/element/edge/arrows/"
version: "5.1.1"
---

# Arrows

[Live example](https://g6.antv.antgroup.com/en/examples/element/edge/arrows/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(16).fill(0).map((_, i) => ({ id: `node${i + 1}` })),
  edges: [
    'default-arrow',
    'triangle-arrow',
    'simple-arrow',
    'vee-arrow',
    'circle-arrow',
    'rect-arrow',
    'diamond-arrow',
    'triangleRect-arrow',
  ].map((id, i) => ({
    id,
    source: `node${i * 2 + 1}`,
    target: `node${i * 2 + 2}`,
  })),
};

const graph = new Graph({
  data,
  edge: {
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
      endArrowType: (d) => d.id.split('-')[0],
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
});

graph.render();
```
