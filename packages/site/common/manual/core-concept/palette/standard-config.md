```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 50,
  data: {
    nodes: new Array(6).fill(0).map((_, i) => ({ id: `node-${i}`, data: { category: ['A', 'B', 'C'][i % 3] } })),
  },
  layout: { type: 'grid', cols: 6 },
  node: {
    palette: {
      type: 'group',
      field: 'category',
      color: 'tableau',
    },
  },
});

graph.render();
```
