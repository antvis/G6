---
title: "Non-strict Radial Layout with Overlap Prevention"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/layout/radial/non-strict-prevent-overlap/"
version: "5.1.1"
---

# Non-strict Radial Layout with Overlap Prevention

[Live example](https://g6.antv.antgroup.com/en/examples/layout/radial/non-strict-prevent-overlap/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/radial.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'center',
      layout: {
        type: 'radial',
        nodeSize: 32,
        unitRadius: 90,
        linkDistance: 200,
        preventOverlap: true,
        maxPreventOverlapIteration: 100,
        strictRadial: false,
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
