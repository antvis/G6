import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import type { STDTestCase } from '../types';

export const controllerElement: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', style: { x: 125, y: 150 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-2', target: 'node-3' },
        { source: 'node-3', target: 'node-1' },
      ],
    },
    node: {
      style: {
        size: 20,
      },
    },
    edge: {
      style: {},
    },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
