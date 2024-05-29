import data from '@@/dataset/soccer.json';
import type { GraphOptions } from '@antv/g6';
import { Graph, register } from '@antv/g6';

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
