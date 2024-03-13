import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 200, y: 200 } },
    { id: 'node-2', style: { x: 350, y: 120 } },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      controlPoints: [[300, 190]],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    style: {
      type: 'polyline', // 👈🏻 Edge shape type.
      controlPoints: (d: any) => d.controlPoints,
    },
  },
  behaviors: [{ type: 'drag-node' }],
});

graph.render();
