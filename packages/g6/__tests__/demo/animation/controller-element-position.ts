import type { G6Spec } from '../../../src';
import { delay } from '../../../src/utils/delay';
import { createGraph } from '../../mock';
import type { AnimationTestCase } from '../types';

export const controllerElementPosition: AnimationTestCase = async (context) => {
  const { canvas } = context;

  const options: G6Spec = {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 250, y: 200 } },
        { id: 'node-2', style: { x: 250, y: 200 } },
        { id: 'node-3', style: { x: 250, y: 200 } },
        { id: 'node-4', style: { x: 250, y: 200 } },
        { id: 'node-5', style: { x: 250, y: 200 } },
        { id: 'node-6', style: { x: 250, y: 200 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-2', target: 'node-3' },
        { source: 'node-3', target: 'node-1' },
        { source: 'node-3', target: 'node-5' },
        { source: 'node-2', target: 'node-4' },
        { source: 'node-2', target: 'node-5' },
        { source: 'node-3', target: 'node-6' },
        { source: 'node-4', target: 'node-5' },
        { source: 'node-5', target: 'node-6' },
      ],
    },
    theme: 'light',
    node: {
      style: {
        width: 20,
        height: 20,
      },
    },
    edge: { style: {} },
  };

  const graph = createGraph(options, canvas);
  await graph.render();

  await delay(500);

  // @ts-expect-error context is private.
  const element = graph.context.element!;

  const result = element.updateNodeLikePosition(
    {
      'node-1': [250, 100],
      'node-2': [175, 200],
      'node-3': [325, 200],
      'node-4': [100, 300],
      'node-5': [250, 300],
      'node-6': [400, 300],
    },
    true,
  );

  return result;
};

controllerElementPosition.times = [0, 200, 1000];
