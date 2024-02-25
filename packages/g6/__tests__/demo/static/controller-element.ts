import type { G6Spec } from '@/src';
import { createGraph } from '@@/utils';
import type { StaticTestCase } from '../types';

export const controllerElement: StaticTestCase = async (context) => {
  const { canvas, animation } = context;

  const options: G6Spec = {
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
    theme: 'light',
    node: {
      style: {
        width: 20,
        height: 20,
      },
      animation: animation && {},
    },
    edge: {
      style: {},
      animation: animation && {},
    },
  };

  const graph = createGraph(options, canvas);

  await graph.render();
};
