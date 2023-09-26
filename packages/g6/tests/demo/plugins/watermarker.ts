import { Graph, Extensions, extend } from '../../../src/index';
import { TestCaseContext } from '../interface';
export default (context: TestCaseContext) => {
  const data = {
    nodes: [
      { id: 'node1', data: { x: 100, y: 200, nodeType: 'a' } },
      { id: 'node2', data: { x: 200, y: 250, nodeType: 'b' } },
      { id: 'node3', data: { x: 200, y: 350, nodeType: 'b' } },
      { id: 'node4', data: { x: 300, y: 250, nodeType: 'c' } },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: { edgeType: 'e1' },
      },
      {
        id: 'edge2',
        source: 'node2',
        target: 'node3',
        data: { edgeType: 'e2' },
      },
      {
        id: 'edge3',
        source: 'node3',
        target: 'node4',
        data: { edgeType: 'e3' },
      },
      {
        id: 'edge4',
        source: 'node1',
        target: 'node4',
        data: { edgeType: 'e3' },
      },
    ],
  };

  const ExtGraph = extend(Graph, {
    plugins: {
      watermarker: Extensions.WaterMarker,
    },
  });
  const graph = new Graph({
    ...context,
    type: 'graph',
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
    plugins: ['watermarker'],
    data,
  });
  return graph;
};
