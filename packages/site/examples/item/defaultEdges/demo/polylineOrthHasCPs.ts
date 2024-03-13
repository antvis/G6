import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 200, y: 200 } },
    { id: 'node-2', style: { x: 350, y: 120 } },
    { id: 'node-cp', style: { x: 300, y: 190, size: 5, color: 'rgb(244, 109, 67)' } },
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
      router: true,
      controlPoints: (d: any) => d.controlPoints,
    },
  },
  behaviors: [{ type: 'drag-node' }],
});

graph.render();
