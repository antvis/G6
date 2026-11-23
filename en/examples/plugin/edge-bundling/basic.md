---
title: "Edge Bundling"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/plugin/edge-bundling/basic/"
version: "5.1.1"
---

# Edge Bundling

[Live example](https://g6.antv.antgroup.com/en/examples/plugin/edge-bundling/basic/)

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
      autoFit: 'view',
      data,
      layout: {
        type: 'circular',
      },
      node: { style: { size: 20 } },
      behaviors: ['drag-canvas', 'drag-element'],
      plugins: [
        {
          key: 'edge-bundling',
          type: 'edge-bundling',
          bundleThreshold: 0.1,
        },
      ],
    });

    graph.render();
  });
```
