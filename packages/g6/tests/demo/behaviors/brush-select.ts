import { Extensions, Graph, register } from '../../../src/index';
import { TestCaseContext } from '../interface';

register('behavior', 'brush-select', Extensions.BrushSelect);
register('widget', 'grid', Extensions.Grid);

export default (context: TestCaseContext) => {
  return new Graph({
    ...context,
    // plugins: ['grid'],
    layout: {
      type: 'grid',
    },
    data: {
      nodes: [
        { id: 'node1', data: {} },
        { id: 'node2', data: {} },
        { id: 'node3', data: {} },
        { id: 'node4', data: {} },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
    },
    modes: {
      default: ['brush-select', 'drag-node'],
    },
  });
};
