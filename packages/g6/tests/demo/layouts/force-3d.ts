import { Graph, Extensions, extend } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const { width, height } = context;
  const ExtGraph = extend(Graph, {
    nodes: {
      'sphere-node': Extensions.SphereNode,
    },
  });
  const graph = new ExtGraph({
    ...context,
    type: 'graph',
    renderer: 'webgl-3d',
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'force',
      dimensions: 3,
      iterations: 100,
      center: [width! / 2, height! / 2, 0],
    },
    edge: {
      type: 'line-edge',
      keyShape: {
        lineWidth: 2,
        stroke: 'grey',
      },
    },
    node: {
      type: 'sphere-node',
      keyShape: {
        opacity: 0.6,
        r: 10,
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
      // },
    },
  });

  return graph;
};
