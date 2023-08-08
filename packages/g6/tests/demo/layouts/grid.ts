import G6 from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseParams } from '../interface';

export default (params: TestCaseParams) => {
  const { width, height } = params;
  return new G6.Graph({
    ...params,
    type: 'graph',
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'grid',
      center: [width! / 2, height! / 2],
    },
  });
};
