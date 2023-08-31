import {
  supportsThreads,
  initThreads,
  FruchtermanLayout,
} from '@antv/layout-wasm';
import { Graph, extend } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

export default async (context: TestCaseContext) => {
  const { width, height } = context;

  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  // Register custom layout
  const ExtGraph = extend(Graph, {
    layouts: {
      'fruchterman-wasm': FruchtermanLayout,
    },
  });

  return new ExtGraph({
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
