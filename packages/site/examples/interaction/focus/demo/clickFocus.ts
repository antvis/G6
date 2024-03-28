import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 150, parentId: 'combo1' } },
    { id: 'node2', style: { x: 180, y: 150, parentId: 'combo1' } },
    { id: 'node3', style: { x: 150, y: 200, parentId: 'combo2' } },
  ],
  edges: [],
  combos: [
    { id: 'combo1', style: { parentId: 'combo2' } }, // collapsed: true
    { id: 'combo2', style: {} },
  ],
};

const graph = new Graph({
  container: 'container',
  width: 500,
  height: 400,
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
  data,
  behaviors: ['drag-canvas', 'collapse-expand', 'focus-element', 'zoom-canvas'],
});

graph.render();
