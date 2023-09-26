import { Graph, Extensions, extend } from '../../../src/index';
import { TestCaseContext } from '../interface';
export default (context: TestCaseContext) => {
  const ExtGraph = extend(Graph, {
    behaviors: {
      'brush-select': Extensions.BrushSelect,
    },
    plugins: {
      grid: Extensions.Grid,
    },
  });

  return new ExtGraph({
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
