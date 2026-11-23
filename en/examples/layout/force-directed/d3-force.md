---
title: "D3 Force Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/force-directed/d3-force/"
version: "5.1.1"
---

# D3 Force Layout

[Live example](https://g6.antv.antgroup.com/en/examples/layout/force-directed/d3-force/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          ports: [],
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      layout: {
        type: 'd3-force',
        collide: {
          strength: 0.5,
        },
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });
```
