```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 50,
  data: {
    nodes: new Array(6).fill(0).map((_, i) => ({ id: `node-${i}`, data: { value: (i + 1) * 20 } })),
  },
  layout: { type: 'grid', cols: 6 },
  node: {
    palette: {
      type: 'value',
      field: 'value',
      color: (value) => `rgb(${value * 255}, 0, 0)`,
    },
  },
});

graph.render();
```
