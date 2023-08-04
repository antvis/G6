import G6 from '../../../src/index';
import { container, data, height, width } from '../../datasets/const';

export default () => {
  return new G6.Graph({
    container,
    width,
    height,
    type: 'graph',
    renderer: 'webgl-3d',
    modes: {
      default: [
        {
          type: 'orbit-canvas-3d',
          trigger: 'drag',
        },
        'zoom-canvas-3d',
      ],
    },
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'force',
      dimensions: 3,
      iterations: 100,
      center: [width / 2, height / 2, 0],
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
      },
      // labelShape: {
      //   text: 'node-label',
      // },
      // iconShape: {
      //   img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      // },
    },
    nodeState: {
      selected: {
        keyShape: {
          fill: '#f00',
        },
        labelShape: {
          fontSize: 20,
        },
      },
    },
  });
};
