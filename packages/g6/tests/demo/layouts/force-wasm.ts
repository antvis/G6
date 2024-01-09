import { ForceLayout, initThreads, supportsThreads } from '@antv/layout-wasm';
import { Graph, register } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

// Register custom layout
register('layout', 'force-wasm', ForceLayout);

export default async (context: TestCaseContext) => {
  const { width, height } = context;

  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  return new Graph({
    ...context,
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'force-wasm',
      threads,
      dimensions: 2,
      maxIteration: 100,
      minMovement: 0.4,
      distanceThresholdMode: 'mean',
      height,
      width,
      center: [width / 2, height / 2],
      factor: 1,
      gravity: 10,
      linkDistance: 200,
      edgeStrength: 200,
      nodeStrength: 1000,
      coulombDisScale: 0.005,
      damping: 0.9,
      maxSpeed: 1000,
      interval: 0.02,
    },
  });
};
