import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 350, y: 200 } },
      { id: 'node2', combo: 'combo1', style: { x: 350, y: 250 } },
      { id: 'node3', combo: 'combo3', style: { x: 100, y: 200 } },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'combo1', target: 'node3' },
    ],
    combos: [
      { id: 'combo1', combo: 'combo2' },
      { id: 'combo2' },
      { id: 'combo3', style: { collapsed: true } },
    ],
  },
  behaviors: ['collapse-expand', 'drag-element'],
});

graph.render();
