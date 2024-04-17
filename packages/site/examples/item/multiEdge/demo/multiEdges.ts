import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 100, y: 120 } },
    { id: 'node2', style: { x: 350, y: 120 } },
  ],
  edges: [
    { id: 'edge1', source: 'node1', target: 'node2' },
    { id: 'edge2', source: 'node1', target: 'node2' },
    { id: 'edge3', source: 'node1', target: 'node2' },
  ],
};

const graph = new Graph({
  data,
  node: {
    style: {
      ports: [{ placement: 'center' }],
    },
  },
  behaviors: ['drag-element'],
  transforms: ['process-parallel-edges'],
});

graph.render();
