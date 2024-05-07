import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 110, y: 150, parentId: 'combo1' } },
    { id: 'node2', style: { x: 190, y: 150, parentId: 'combo1' } },
    { id: 'node3', style: { x: 150, y: 260, parentId: 'combo2' } },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
  combos: [
    { id: 'combo1', style: { parentId: 'combo2' } },
    { id: 'combo2', style: {} },
  ],
};

const graph = new Graph({
  container: 'container',
  node: {
    style: { labelText: (d) => d.id },
  },
  data,
  animation: true,
  behaviors: [
    'collapse-expand',
    {
      type: 'focus-element',
      animation: {
        easing: 'ease-out',
        duration: 3500,
      },
      enable: (e) => e.targetType === 'node',
    },
  ],
});

graph.render();
