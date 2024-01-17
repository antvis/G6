import { Graph } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const { width, height } = context;
  const graph = new Graph({
    ...context,
    type: 'graph',
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'circular',
      center: [width! / 2, height! / 2],
      radius: 200,
    },
    modes: {
      default: ['drag-canvas', 'zoom-canvas'],
    },
  });
  return graph;
};
