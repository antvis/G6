```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  width: 50,
  height: 50,
  container,
  data: {
    nodes: [{ id: 'node-1', style: { x: 25, y: 25, size: 20 } }],
  },
  node: {
    animation: {
      update: [
        {
          fields: ['r'],
          shape: 'key',
        },
      ],
    },
  },
});

graph.draw().then(() => {
  graph.updateNodeData([{ id: 'node-1', style: { size: 40 } }]);
  graph.draw();
});
```
