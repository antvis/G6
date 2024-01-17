import { Graph } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const { width, height } = context;
  return new Graph({
    ...context,
    type: 'graph',
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'grid',
      center: [width! / 2, height! / 2],
    },
  });
};
