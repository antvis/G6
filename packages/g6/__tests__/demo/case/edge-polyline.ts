import { Graph } from '@/src';
import type { STDTestCase } from '../types';

export const edgePolyline: STDTestCase = async (context) => {
  const data = {
    nodes: [
      { id: 'node-1', data: {}, style: { x: 200, y: 200 } },
      { id: 'node-2', data: {}, style: { x: 350, y: 120 } },
    ],
    edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
  };

  const graph = new Graph({
    ...context,
    data,
    edge: {
      style: {
        type: 'polyline',
        router: true,
      },
    },
    behaviors: [{ type: 'drag-node' }],
  });

  await graph.render();

  return graph;
};
