import { FruchtermanLayout } from '@antv/layout-gpu';
import { Graph, register } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

// Register custom layout
register('layout', 'fruchterman-gpu', FruchtermanLayout);

export default async (context: TestCaseContext) => {
  const { width, height } = context;

  return new Graph({
    ...context,
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
