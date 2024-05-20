import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', combo: 'combo1', style: { x: 110, y: 150 } },
    { id: 'node2', combo: 'combo1', style: { x: 190, y: 150 } },
    { id: 'node3', combo: 'combo2', style: { x: 150, y: 260 } },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
  combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
};

const graph = new Graph({
  container: 'container',
  node: {
    style: { labelText: (d) => d.id },
  },
  data,
  behaviors: ['collapse-expand', 'focus-element'],
});

graph.render();
