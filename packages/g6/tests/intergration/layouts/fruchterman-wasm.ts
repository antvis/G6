import {
  supportsThreads,
  initThreads,
  FruchtermanLayout,
} from '@antv/layout-wasm';
import G6 from '../../../src/index';
import { container, data, height, width } from '../../datasets/const';

export default async () => {
  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  // Register custom layout
  G6.stdLib.layouts['fruchterman-wasm'] = FruchtermanLayout;

  return new G6.Graph({
    container,
    width,
    height,
    type: 'graph',
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
