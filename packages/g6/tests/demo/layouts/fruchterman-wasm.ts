import { FruchtermanLayout, initThreads, supportsThreads } from '@antv/layout-wasm';
import { Graph, register } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

register('layout', 'fruchterman-wasm', FruchtermanLayout);

export default async (context: TestCaseContext) => {
  const { width, height } = context;

  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  return new Graph({
    ...context,
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'fruchterman-wasm',
      threads,
      dimensions: 2,
      maxIteration: 1000,
      minMovement: 0.4,
      distanceThresholdMode: 'mean',
      height,
      width,
      gravity: 1,
      speed: 5,
    },
  });
};
