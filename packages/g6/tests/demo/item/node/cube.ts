import { Graph, Extensions, extend } from '../../../../src/index';
import { data } from '../../../datasets/dataset1';
import { TestCaseContext } from '../../interface';

export default (context: TestCaseContext) => {
  const ExtGraph = extend(Graph, {
    nodes: {
      'cube-node': Extensions.CubeNode,
    },
  });
  const graph = new ExtGraph({
    ...context,
    type: 'graph',
    renderer: 'webgl-3d',
    data: {
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
    },
    node: {
      type: 'cube-node',
      keyShape: {
        opacity: 0.7,
        r: 10,
        width: 100,
        height: 200,
        depth: 200,
      },
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
        fontSize: 4,
        wordWrapWidth: 200,
        isSizeAttenuation: true,
      },
      // iconShape: {
      //   img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      //   z: 100
      // },
      // labelBackgroundShape: [],
    },
  });
  return graph;
};
