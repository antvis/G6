import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
    { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
    { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
  ],
  edges: [],
  combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  combo: {
    type: 'circle',
  },
  behaviors: ['drag-element', 'collapse-expand'],
});

graph.render();
