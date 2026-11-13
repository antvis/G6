---
title: "Radial Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/dendrogram/radial/"
version: "5.1.1"
---

# Radial Layout

[Live example](https://g6.antv.antgroup.com/en/examples/layout/dendrogram/radial/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      node: {
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'dendrogram',
        radial: true,
        nodeSep: 40,
        rankSep: 140,
      },
    });

    graph.render();
  });
```
