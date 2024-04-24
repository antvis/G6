import type { GraphOptions } from '@/src';
import { Graph, register } from '@/src';
import data from '@@/dataset/soccer.json';

export const layoutFruchtermanGPU: TestCase = async (context) => {
  register('layout', 'fruchterman-gpu', (await import('@antv/layout-gpu')).FruchtermanLayout);

  const options: GraphOptions = {
    ...context,
    data,
    theme: 'light',
    layout: {
      type: 'fruchterman-gpu',
      maxIteration: 1000,
      minMovement: 0.4,
      distanceThresholdMode: 'mean',
      gravity: 1,
      speed: 5,
    },
    node: { style: { size: 20 } },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
