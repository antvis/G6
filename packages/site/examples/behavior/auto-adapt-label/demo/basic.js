import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 200, y: 100, labelText: '短标签' } },
    { id: 'node2', style: { x: 360, y: 100, labelText: '中等长度的标签' } },
    { id: 'node3', style: { x: 280, y: 220, labelText: '这是一个非常非常长的标签，需要自适应显示'} },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node3' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  behaviors: [
    'zoom-canvas', 
    'drag-canvas', 
    { 
      key: 'auto-adapt-label', 
      type: 'auto-adapt-label',
      padding: 0,
      throttle: 200
    }
  ],
  plugins: [{ type: 'grid-line', size: 30 }],
  animation: true,
});

graph.render();