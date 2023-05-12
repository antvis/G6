import G6 from '../../../src/index';
import { container, data, height, width } from '../../datasets/const';
import { supportsThreads, initThreads, ForceLayout } from '@antv/layout-wasm';

export default async () => {
  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  // Register custom layout
  G6.stdLib.layouts['force-wasm'] = ForceLayout;

  return new G6.Graph({
    container,
    width,
    height,
    type: 'graph',
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
