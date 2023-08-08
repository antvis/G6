import G6 from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseParams } from '../interface';

export default (params: TestCaseParams) => {
  const { width, height } = params;
  const graph = new G6.Graph({
    ...params,
    type: 'graph',
    renderer: 'webgl-3d',
    // modes: {
    //   default: [
    //     {
    //       type: 'orbit-canvas-3d',
    //       trigger: 'drag',
    //     },
    //     'zoom-canvas-3d',
    //   ],
    // },
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
