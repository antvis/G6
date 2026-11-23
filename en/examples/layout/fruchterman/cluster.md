---
title: "Fruchterman Cluster Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/fruchterman/cluster/"
version: "5.1.1"
---

# Fruchterman Cluster Layout

[Live example](https://g6.antv.antgroup.com/en/examples/layout/fruchterman/cluster/)

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
      layout: {
        type: 'fruchterman',
        gravity: 5,
        speed: 5,
        clustering: true,
        nodeClusterBy: 'cluster',
        clusterGravity: 16,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      edge: {
        style: {
          endArrow: true,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```
