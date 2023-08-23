import G6 from '../../../src/index';
import { treeDataCfg } from '../../datasets/dataCfg';
import { TestCaseContext } from '../interface';

export default (
  context: TestCaseContext,
  options: { trigger?: string } = {},
) => {
  const { trigger = 'click' } = options;
  const graph = new G6.Graph({
    ...context,
    layout: {
      type: 'compactBox',
    },
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
    },
    data: treeDataCfg,
    modes: {
      default: [{ type: 'collapse-expand-tree', trigger }],
    },
  });
  graph.translateTo({ x: 150, y: 200 });
  return graph;
};
