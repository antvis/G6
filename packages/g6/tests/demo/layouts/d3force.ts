import { Extensions, Graph, register } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

register('layout', 'd3force', Extensions.D3ForceLayout);

export default (context: TestCaseContext) => {
  const { width, height } = context;

  return new Graph({
    ...context,
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'd3force',
      animated: true,
      center: [width! / 2, height! / 2],
      preventOverlap: true,
      nodeSize: 20,
    },
  });
};
