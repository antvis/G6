```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 50,
  data: {
    nodes: [{ id: 'node-1', style: { x: 25, y: 25, size: 20 } }],
  },
  node: {
    animation: {
      update: [
        {
          fields: ['x', 'y'],
        },
        { fields: ['r', 'fill'], shape: 'key' },
      ],
    },
  },
});

graph.draw().then(() => {
  graph.updateNodeData([{ id: 'node-1', style: { x: 175, size: 40, fill: 'pink' } }]);
  graph.draw();
});
```
