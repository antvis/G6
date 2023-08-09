import G6 from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const { width, height } = context;
  return new G6.Graph({
    ...context,
    type: 'graph',
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'force',
      center: [width! / 2, height! / 2, 0],
      preventOverlap: true,
      nodeSize: 20,
    },
  });
};
