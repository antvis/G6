import { ForceAtlas2Layout, initThreads, supportsThreads } from '@antv/layout-wasm';
import { Graph, register } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

// Register custom layout
register('layout', 'forceatlas2-wasm', ForceAtlas2Layout);

export default async (context: TestCaseContext) => {
  const { width, height } = context;

  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  return new Graph({
    ...context,
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'forceatlas2-wasm',
      threads,
      dimensions: 2,
      maxIteration: 100,
      minMovement: 0.4,
      distanceThresholdMode: 'mean',
      height,
      width,
      center: [width / 2, height / 2],
      kg: 5,
      kr: 10,
      ks: 0.1,
    },
  });
};
