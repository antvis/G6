import { ForceAtlas2Layout, initThreads, supportsThreads } from '@antv/layout-wasm';
import type { G6Spec } from '../../../src';
import { Graph, register } from '../../../src';
import data from '../../dataset/soccer.json';
import type { StaticTestCase } from '../types';

register('layout', 'forceatlas2-wasm', ForceAtlas2Layout);

export const controllerLayoutForceatlas2WASM: StaticTestCase = async ({ canvas, animation }) => {
  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  const options: G6Spec = {
    container: canvas,
    animation,
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
      animation,
    },
    node: { style: { width: 20, height: 20 } },
  };

  const graph = new Graph(options);

  await graph.render();
};
