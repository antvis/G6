import { Graph, type G6Spec } from '@/src';
import type { AnimateEvent } from '@/src/utils/event';
import type { IAnimation } from '@antv/g';
import type { AnimationTestCase } from '../types';

export const controllerElement: AnimationTestCase = async (context) => {
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
    theme: 'light',
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

  graph.addNodeData([
    { id: 'node-4', style: { x: 50, y: 200, color: 'orange' } },
    { id: 'node-5', style: { x: 75, y: 150, color: 'purple' } },
    { id: 'node-6', style: { x: 200, y: 100, color: 'cyan' } },
  ]);

  graph.removeNodeData(['node-1']);

  graph.updateNodeData([{ id: 'node-2', style: { x: 200, y: 200, stroke: 'green' } }]);

  const result = new Promise<IAnimation>((resolve) => {
    graph.once('beforeanimate', (e: AnimateEvent) => {
      resolve(e.animation!);
    });
  });

  graph.draw();

  return await result;
};

controllerElement.times = [50, 200, 1000];
