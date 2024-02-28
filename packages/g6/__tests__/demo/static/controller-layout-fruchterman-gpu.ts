import type { G6Spec } from '@/src';
import { Graph, register } from '@/src';
import data from '@@/dataset/soccer.json';
import { FruchtermanLayout } from '@antv/layout-gpu';
import type { STDTestCase } from '../types';

register('layout', 'fruchterman-gpu', FruchtermanLayout);

export const controllerLayoutFruchtermanGPU: STDTestCase = async (context) => {
  const options: G6Spec = {
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
