---
title: "Right Side Indented Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/indented/right-side/"
version: "5.1.1"
---

# Right Side Indented Layout

[Live example](https://g6.antv.antgroup.com/en/examples/layout/indented/right-side/)

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
      data: treeToGraphData(data),
      autoFit: 'view',
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: 'right',
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          radius: 4,
          router: {
            type: 'orth',
          },
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        indent: 80,
        getHeight: () => 16,
        getWidth: () => 32,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
```
