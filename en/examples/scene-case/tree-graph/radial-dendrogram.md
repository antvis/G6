---
title: "Radial Dendrogram"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/scene-case/tree-graph/radial-dendrogram/"
version: "5.1.1"
---

# Radial Dendrogram

[Live example](https://g6.antv.antgroup.com/en/examples/scene-case/tree-graph/radial-dendrogram/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/flare.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      padding: 50,
      data: treeToGraphData(data),
      node: {
        style: {
          size: 12,
          labelText: (d) => d.id,
          labelBackground: true,
          labelFontSize: 14,
          labelFontFamily: 'Gill Sans',
        },
      },
      edge: {
        type: 'cubic-radial',
        style: {
          lineWidth: 3,
        },
      },
      layout: {
        type: 'dendrogram',
        radial: true,
        preLayout: false,
      },
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        'drag-element',
        {
          key: 'hover-activate',
          type: 'hover-activate',
          degree: 5,
          direction: 'in',
          inactiveState: 'inactive',
        },
      ],
      transforms: ['place-radial-labels'],
      animation: false,
    });

    graph.render();
  });
```
