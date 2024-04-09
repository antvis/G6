import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  combo: {
    style: {
      type: 'circle', // 👈🏻 Combo shape type.
    },
  },
  data: {
    nodes: [
      { id: 'node1', style: { x: 250, y: 150, parentId: 'combo1', lineWidth: 0 } },
      { id: 'node2', style: { x: 350, y: 150, parentId: 'combo1', lineWidth: 0 } },
      { id: 'node3', style: { x: 250, y: 300, parentId: 'combo2', lineWidth: 0 } },
    ],
    edges: [
      { id: 'edge1', target: 'node1', source: 'node2' },
      { id: 'edge2', target: 'node1', source: 'node3' },
    ],
    combos: [
      { id: 'combo1', style: { parentId: 'combo2' } }, // collapsed: true
      { id: 'combo2', style: {} },
    ],
  },
  animation: false,
  behaviors: [
    {
      type: 'brush-select',
      isTimely: true, // need mode: 'default'.
      mode: 'default',
    },
  ],
});

graph.render();
