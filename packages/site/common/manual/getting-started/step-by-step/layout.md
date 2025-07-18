```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 200,
  data: {
    nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
    edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
  },
  node: {
    style: {
      size: 20,
      fill: 'pink',
    },
  },
  edge: {
    style: {
      stroke: 'lightgreen',
    },
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  layout: {
    type: 'd3-force',
  },
});

graph.render();
```
