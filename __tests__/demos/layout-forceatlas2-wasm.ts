import data from '@@/dataset/soccer.json';
import type { GraphOptions } from '@antv/g6';
import { Graph, register } from '@antv/g6';

export const layoutForceatlas2WASM: TestCase = async (context) => {
  const { ForceAtlas2Layout, initThreads, supportsThreads } = await import('@antv/layout-wasm');
  register('layout', 'forceatlas2-wasm', ForceAtlas2Layout);

  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  const options: GraphOptions = {
    ...context,
    data,
    theme: 'light',
    layout: {
      type: 'forceatlas2-wasm',
      threads,
      dimensions: 2,
      maxIteration: 100,
      minMovement: 0.4,
      distanceThresholdMode: 'mean',
      kg: 5,
      kr: 10,
      ks: 0.1,
    },
    node: { style: { size: 20 } },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
