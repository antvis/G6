import {
  supportsThreads,
  initThreads,
  ForceAtlas2Layout,
} from '@antv/layout-wasm';
import G6 from '../../../src/index';
import { container, data, height, width } from '../../datasets/const';

export default async () => {
  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  // Register custom layout
  G6.stdLib.layouts['forceatlas2-wasm'] = ForceAtlas2Layout;

  return new G6.Graph({
    container,
    width,
    height,
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
