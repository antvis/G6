```ts
import { Graph, treeToGraphData } from '@antv/g6';

const data = {
  id: 'root',
  children: [
    { id: 'node1', children: [{ id: 'node1-1' }, { id: 'node1-2' }] },
    { id: 'node2', children: [{ id: 'node2-1' }, { id: 'node2-2' }] },
  ],
};

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'compact-box',
    direction: 'TB',
  },
  data: treeToGraphData(data),
  edge: {
    type: 'cubic-vertical',
  },
});

graph.render();
```

```js | ob { pin:false }
createGraph(
  {
    autoFit: 'view',
    data: g6.treeToGraphData({
      id: 'root',
      children: [
        { id: 'node1', children: [{ id: 'node1-1' }, { id: 'node1-2' }] },
        { id: 'node2', children: [{ id: 'node2-1' }, { id: 'node2-2' }] },
      ],
    }),
    layout: {
      type: 'compact-box',
      direction: 'TB',
    },
    node: {
      style: {
        ports: [{ placement: 'center' }],
      },
    },
    edge: {
      type: 'cubic-vertical',
    },
  },
  { width: 200, height: 200 },
);
```
