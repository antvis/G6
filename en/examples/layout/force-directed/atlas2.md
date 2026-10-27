---
title: "Force-Atlas 2 Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/force-directed/atlas2/"
version: "5.1.1"
---

# Force-Atlas 2 Layout

[Live example](https://g6.antv.antgroup.com/en/examples/layout/force-directed/atlas2/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      layout: {
        type: 'force-atlas2',
        preventOverlap: true,
        kr: 20,
        center: [250, 250],
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
      autoResize: true,
      zoomRange: [0.1, 5],
    });

    graph.render();
  });
```
