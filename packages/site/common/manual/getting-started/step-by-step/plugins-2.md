```js | ob {  pin: false , autoMount: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 200,
  data: {
    nodes: Array.from({ length: 10 }).map((_, i) => ({
      id: `node-${i}`,
      data: { category: i === 0 ? 'central' : 'around' },
    })),
    edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
  },
  node: {
    style: {
      size: 20,
    },
    palette: {
      field: 'category',
      color: 'tableau',
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
  plugins: [{ type: 'grid-line', follow: true }],
});

graph.render();
```
