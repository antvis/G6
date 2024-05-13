import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
      { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
      { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
    ],
    combos: [{ id: 'combo1' }, { id: 'combo2', style: { ports: [{ placement: 'center' }] } }],
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'drag',
      style: {
        lineWidth: 2,
        lineDash: [2, 3],
      },
    },
  ],
});

graph.render();
