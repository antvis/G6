import { Graph } from '../../../../src/index';
import { TestCaseContext } from '../../interface';

export default (context: TestCaseContext) => {
  const { width, height } = context;

  const data = {
    nodes: [
      {
        id: 1,
        data: {
          x: 100,
          y: 100,
          type: 'rect-node',
        },
      },
      {
        id: 2,
        data: {
          x: 200,
          y: 100,
          type: 'rect-node',
        },
      },
      {
        id: 3,
        data: {
          x: 100,
          y: 200,
          type: 'rect-node',
        },
      },
      {
        id: 4,
        data: {
          x: 200,
          y: 200,
          type: 'rect-node',
        },
      },
    ],
  };

  const graph = new Graph({
    ...context,
    type: 'graph',
    data,
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
            height: 50,
            width: 50,
          },
          labelShape: {
            text: 'label',
            position: 'bottom',
          },
          iconShape: {
            img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
            // text: 'label',
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
        },
      };
    },
  });
  return graph;
};
