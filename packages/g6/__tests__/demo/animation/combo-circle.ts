import type { G6Spec } from '@/src';
import type { AnimateEvent } from '@/src/utils/event';
import { createGraph } from '@@/utils';
import type { IAnimation } from '@antv/g';
import type { AnimationTestCase } from '../types';

export const comboCircle: AnimationTestCase = async (context) => {
  const { canvas, animation } = context;

  const options: G6Spec = {
    animation,
    data: {
      nodes: [
        { id: 'node-1', style: { parentId: 'combo-1', x: 100, y: 100 } },
        {
          id: 'node-2',
          style: { parentId: 'combo-1', x: 200, y: 100 },
        },
      ],
      combos: [{ id: 'combo-1' }],
    },
  };

  const graph = createGraph(options, canvas);
  await graph.draw();

  graph.addNodeData([{ id: 'node-3', style: { parentId: 'combo-1', x: 200, y: 200 } }]);
  graph.updateNodeData([
    {
      id: 'node-2',
      style: { parentId: 'combo-1', x: 250, y: 100 },
    },
  ]);
  graph.removeNodeData(['node-1']);

  graph.draw();

  const result = new Promise<IAnimation>((resolve) => {
    graph.once('beforeanimate', (e: AnimateEvent) => {
      resolve(e.animation!);
    });
  });

  return await result;
};

comboCircle.times = [50, 200, 1000];
