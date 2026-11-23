---
title: "Divided Circular Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/circular/division/"
version: "5.1.1"
---

# Divided Circular Layout

[Live example](https://g6.antv.antgroup.com/en/examples/layout/circular/division/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          labelFill: '#fff',
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'circular',
        divisions: 5,
        radius: 200,
        startAngle: Math.PI / 4,
        endAngle: Math.PI,
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```
