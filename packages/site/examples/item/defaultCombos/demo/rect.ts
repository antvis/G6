import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 250, y: 150, parentId: 'combo1' } },
    { id: 'node2', style: { x: 350, y: 150, parentId: 'combo1' } },
    { id: 'node3', style: { x: 250, y: 300, parentId: 'combo2' } },
  ],
  edges: [],
  combos: [
    { id: 'combo1', style: { parentId: 'combo2' } }, // collapsed: true
    { id: 'combo2', style: {} },
  ],
};

const graph = new Graph({
  container: 'container',
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  combo: {
    style: {
      type: 'rect', // 👈🏻 Combo shape type.
      padding: 20,
    },
  },
  data,
  behaviors: ['drag-element', 'collapse-expand'],
});

graph.render();
