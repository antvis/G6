```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 400,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo2', style: { x: 100, y: 100, labelText: '微服务1' } },
      { id: 'node2', combo: 'combo2', style: { x: 200, y: 100, labelText: '微服务2' } },
      { id: 'node3', combo: 'combo2', style: { x: 100, y: 200, labelText: '微服务3' } },
      { id: 'node4', combo: 'combo2', style: { x: 200, y: 200, labelText: '微服务4' } },
      { id: 'node5', combo: 'combo3', style: { x: 300, y: 100, labelText: '第三方登录' } },
      { id: 'node6', combo: 'combo3', style: { x: 300, y: 150, labelText: '任务调度' } },
      { id: 'node7', combo: 'combo3', style: { x: 300, y: 200, labelText: '消息服务' } },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node3', target: 'node4' },
    ],
    combos: [
      { id: 'combo1', style: { labelText: '服务层' } },
      { id: 'combo2', combo: 'combo1', style: { labelText: '业务微服务' } },
      { id: 'combo3', combo: 'combo1', style: { labelText: '集成模块' } },
    ],
  },
  node: {
    type: 'rect',
  },
  edge: {
    style: {
      endArrow: true,
    },
  },
  combo: {
    type: 'rect',
    style: {
      padding: 16,
    },
  },
  behaviors: ['drag-element', 'collapse-expand'],
  animation: true,
});

graph.render();
```
