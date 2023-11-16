import { Graph, extend, Extensions } from '../../../src/index';
import type { TestCaseContext } from '../interface';

const ExtGraph = extend(Graph, {
  plugins: {
    annotation: Extensions.Annotation,
  },
});

export default (context: TestCaseContext) => {
  const graphData = {
    nodes: [
      { id: 'node1', data: {} },
      { id: 'node2', data: {} },
      { id: 'node3', data: {} },
      { id: 'node4', data: {} },
      { id: 'node5', data: {} },
      { id: 'node6', data: {} },
      { id: 'node7', data: {} },
      { id: 'node8', data: {} },
      { id: 'node9', data: {} },
      { id: 'node10', data: {} },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2', data: {} },
      { id: 'edge2', source: 'node1', target: 'node3', data: {} },
      { id: 'edge3', source: 'node1', target: 'node4', data: {} },
      { id: 'edge4', source: 'node2', target: 'node3', data: {} },
      { id: 'edge5', source: 'node3', target: 'node4', data: {} },
      { id: 'edge6', source: 'node4', target: 'node5', data: {} },
      { id: 'edge7', source: 'node5', target: 'node6', data: {} },
      { id: 'edge8', source: 'node6', target: 'node7', data: {} },
      { id: 'edge9', source: 'node7', target: 'node8', data: {} },
      { id: 'edge10', source: 'node8', target: 'node9', data: {} },
      { id: 'edge11', source: 'node9', target: 'node10', data: {} },
    ],
  };

  const graph = ((globalThis as any).__graph = new ExtGraph({
    ...context,
    layout: {
      type: 'grid',
    },
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
    },
    plugins: [
      {
        type: 'annotation',
        key: 'annotation',
        cardCfg: {
          focusEditOnInit: 'content',
        },
      },
    ],
    data: graphData,
  }));

  return graph;
};
