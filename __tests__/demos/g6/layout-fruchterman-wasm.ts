import data from '@@/dataset/soccer.json';
import type { GraphOptions } from '@antv/g6';
import { Graph, register } from '@antv/g6';

export const layoutFruchtermanWASM: TestCase = async (context) => {
  const { FruchtermanLayout, initThreads, supportsThreads } = await import('@antv/layout-wasm');

  register('layout', 'fruchterman-wasm', FruchtermanLayout);

  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  const options: GraphOptions = {
    ...context,
    data,
    theme: 'light',
    layout: {
      type: 'fruchterman-wasm',
      threads,
      dimensions: 2,
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
