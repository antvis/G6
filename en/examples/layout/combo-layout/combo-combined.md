---
title: "Combo Combined Layout"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/combo-layout/combo-combined/"
version: "5.1.1"
---

# Combo Combined Layout

[Live example](https://g6.antv.antgroup.com/en/examples/layout/combo-layout/combo-combined/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/combo.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'combo-combined',
        comboPadding: 2,
      },
      node: {
        style: {
          size: 20,
          labelText: (d) => d.id,
        },
        palette: {
          type: 'group',
          field: (d) => d.combo,
        },
      },
      edge: {
        style: (model) => {
          const { size, color } = model.data;
          return {
            stroke: color || '#99ADD1',
            lineWidth: size || 1,
          };
        },
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
      autoFit: 'view',
    });

    graph.render();
  });
```
