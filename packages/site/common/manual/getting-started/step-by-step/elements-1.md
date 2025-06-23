```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  data: {
    nodes: [
      { id: 'node-1', style: { x: 50, y: 50 } },
      { id: 'node-2', style: { x: 150, y: 50 } },
    ],
    edges: [{ source: 'node-1', target: 'node-2' }],
  },
  node: {
    style: {
      fill: 'pink',
    },
  },
  edge: {
    style: {
      stroke: 'lightgreen',
    },
  },
});

graph.render();
```
