```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 100,
  data: {
    nodes: new Array(30).fill(0).map((_, i) => ({ id: `node-${i}` })),
  },
  layout: { type: 'grid', cols: 10, rows: 3 },
  node: {
    palette: 'spectral',
  },
});

graph.render();
```
