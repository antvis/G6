import type { G6Spec } from '@/src';
import { Graph, register } from '@/src';
import data from '@@/dataset/soccer.json';
import { FruchtermanLayout, initThreads, supportsThreads } from '@antv/layout-wasm';
import type { STDTestCase } from '../types';

register('layout', 'fruchterman-wasm', FruchtermanLayout);

export const controllerLayoutFruchtermanWASM: STDTestCase = async (context) => {
  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  const options: G6Spec = {
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
