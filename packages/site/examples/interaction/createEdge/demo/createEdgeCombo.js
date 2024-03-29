import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 250, y: 150, parentId: 'combo1' } },
    { id: 'node2', style: { x: 350, y: 150, parentId: 'combo1' } },
    { id: 'node3', style: { x: 250, y: 300, parentId: 'combo2' } },
  ],
  edges: [],
  combos: [
    {
      id: 'combo1', 
    },
    {
      id: 'combo2', style: {
        // 指向中心
        ports: [
          { key: 'port-1', placement: [0.5, 0.5] },
        ]
      }
    },
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
      type: 'circle', // 👈🏻 Combo shape type.
    },
  },
  data,
  behaviors: [{
    type: 'create-edge',
    trigger: 'drag',
    edgeConfig: {
      lineWidth: 2,
      lineDash: [2, 3],
    },
  }],
});

graph.render();
