```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 600,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo2', style: { x: 150, y: 150 } },
      { id: 'node2', combo: 'combo2', style: { x: 200, y: 150 } },
      { id: 'node3', combo: 'combo3', style: { x: 300, y: 150 } },
      { id: 'node4', combo: 'combo3', style: { x: 350, y: 150 } },
      { id: 'node5', combo: 'combo4', style: { x: 230, y: 300 } },
      { id: 'node6', combo: 'combo4', style: { x: 280, y: 300 } },
    ],
    combos: [
      { id: 'combo1', style: { labelText: '兴趣小组' } },
      { id: 'combo2', combo: 'combo1', style: { labelText: '书法' } },
      { id: 'combo3', combo: 'combo1', style: { labelText: '影视' } },
      { id: 'combo4', combo: 'combo1', style: { labelText: '游戏' } },
    ],
  },
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  behaviors: ['drag-element', 'collapse-expand'],
  animation: true,
});

graph.render();
```
