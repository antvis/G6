```js | ob {  pin: false , autoMount: true }
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
    type: (datum) => (datum.id === 'node-1' ? 'circle' : 'rect'),
    style: {
      fill: 'pink',
      size: 20,
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
