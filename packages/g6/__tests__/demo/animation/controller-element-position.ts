import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import type { AnimateEvent } from '@/src/utils/event';
import type { IAnimation } from '@antv/g';
import type { AnimationTestCase } from '../types';

export const controllerElementPosition: AnimationTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
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
    node: {
      style: {
        size: 20,
      },
    },
  };

  const graph = new Graph(options);
  await graph.render();

  const result = new Promise<IAnimation>((resolve) => {
    graph.once('beforeanimate', (e: AnimateEvent) => {
      resolve(e.animation!);
    });
  });

  graph.translateElementTo(
    {
      'node-1': [250, 100],
      'node-2': [175, 200],
      'node-3': [325, 200],
      'node-4': [100, 300],
      'node-5': [250, 300],
      'node-6': [400, 300],
    },
    context.animation,
  );

  return await result;
};

controllerElementPosition.times = [0, 200, 1000];
