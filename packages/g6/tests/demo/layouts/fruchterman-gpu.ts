import { FruchtermanLayout } from '@antv/layout-gpu';
import G6 from '../../../src/index';
import { container, data, height, width } from '../../datasets/const';

export default async () => {
  // Register custom layout
  G6.stdLib.layouts['fruchterman-gpu'] = FruchtermanLayout;

  return new G6.Graph({
    container,
    width,
    height,
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'fruchterman-gpu',
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
