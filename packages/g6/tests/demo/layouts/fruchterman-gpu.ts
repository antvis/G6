import { FruchtermanLayout } from '@antv/layout-gpu';
import { Graph, extend } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

export default async (context: TestCaseContext) => {
  const { width, height } = context;

  // Register custom layout
  const ExtGraph = extend(Graph, {
    layouts: {
      'fruchterman-gpu': FruchtermanLayout,
    },
  });

  return new ExtGraph({
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
