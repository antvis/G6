---
title: "Basic Fruchterman Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/fruchterman/basic/"
version: "5.1.1"
---

# Basic Fruchterman Layout

[Live example](https://g6.antv.antgroup.com/en/examples/layout/fruchterman/basic/)

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
        animation: true,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```
