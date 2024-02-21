import { FruchtermanLayout } from '@antv/layout-gpu';
import type { G6Spec } from '../../../src';
import { register } from '../../../src';
import data from '../../dataset/soccer.json';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

register('layout', 'fruchterman-gpu', FruchtermanLayout);

export const controllerLayoutFruchtermanGPU: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    data,
    theme: 'light',
    layout: {
      type: 'fruchterman-gpu',
      maxIteration: 1000,
      minMovement: 0.4,
      distanceThresholdMode: 'mean',
      gravity: 1,
      speed: 5,
      animation,
    },
    node: { style: { width: 20, height: 20 } },
  };

  const graph = createGraph(options, canvas);

  await graph.render();
};
