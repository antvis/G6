import { Graph, Extensions, extend } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const { width, height } = context;
  const ExtGraph = extend(Graph, {
    layouts: {
      'd3force': Extensions.D3ForceLayout
    },
  });
  return new ExtGraph({
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
