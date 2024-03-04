import type { G6Spec } from '@/src';
import { Graph, register } from '@/src';
import data from '@@/dataset/soccer.json';
import { ForceAtlas2Layout, initThreads, supportsThreads } from '@antv/layout-wasm';
import type { STDTestCase } from '../types';

register('layout', 'forceatlas2-wasm', ForceAtlas2Layout);

export const controllerLayoutForceatlas2WASM: STDTestCase = async (context) => {
  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  const options: G6Spec = {
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
