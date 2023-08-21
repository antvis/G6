import G6 from '../../../../src/index';
import { container, height, width } from '../../../datasets/const';

export default () => {
  const data = {
    nodes: [
      {
        id: 1,
        data: {
          x: 100,
          y: 100,
          type: 'donut-node',
        },
      },
      {
        id: 2,
        data: {
          x: 200,
          y: 100,
          type: 'donut-node',
        },
      },
    ],
    edges: [
      {
        source: 1,
        target: 2,
        data: {},
      },
    ],
  };

  const graph = new G6.Graph({
    container,
    width,
    height,
    data,
    type: 'graph',
    modes: {
      default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
    },
    node: (nodeInnerModel: any) => {
      const { id, data } = nodeInnerModel;
      return {
        id,
        data: {
          ...data,
          keyShape: {
            r: 30,
          },
          labelShape: {
            text: 'label',
            position: 'bottom',
          },
          iconShape: {
            img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
          },
          badgeShapes: [
            {
              text: '1',
              position: 'rightTop',
              color: 'blue',
            },
          ],
          labelBackgroundShape: {
            fill: 'red',
          },
          anchorShapes: [
            {
              position: [0, 0.5],
              r: 2,
              fill: 'red',
            },
          ],
          donutShapes: {
            innerSize: 0.6,
            attrs: {
              income: 80,
              outcome: 40,
              unknown: 45,
            },
            colorMap: {
              income: '#61DDAA',
              outcome: '#F08BB4',
              unknown: '#65789B',
            },
          },
        },
      };
    },
  });

  return graph;
};
