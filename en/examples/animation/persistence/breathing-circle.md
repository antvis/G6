---
title: "Fly Marker"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/examples/animation/persistence/breathing-circle/"
version: "5.1.1"
---

# Fly Marker

[Live example](https://g6.antv.antgroup.com/en/examples/animation/persistence/breathing-circle/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```js
import { Circle, ExtensionCategory, Graph, register } from '@antv/g6';

class BreathingCircle extends Circle {
  onCreate() {
    const halo = this.shapeMap.halo;
    halo.animate([{ lineWidth: 0 }, { lineWidth: 20 }], {
      duration: 1000,
      iterations: Infinity,
      direction: 'alternate',
    });
  }
}

register(ExtensionCategory.NODE, 'breathing-circle', BreathingCircle);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }],
  },
  node: {
    type: 'breathing-circle',
    style: {
      size: 50,
      halo: true,
    },
    palette: ['#3875f6', '#efb041', '#ec5b56', '#72c240'],
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```
