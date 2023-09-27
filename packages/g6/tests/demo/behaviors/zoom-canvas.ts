import G6, { Extensions, extend } from '../../../src/index';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const ExtGraph = extend(G6.Graph, {
    nodes: {
      'star-node': Extensions.StarNode,
    },
    edges: {
      'cubic-edge': Extensions.CubicEdge,
      'loop-edge': Extensions.LoopEdge,
    },
    behaviors: {
      'brush-select': Extensions.BrushSelect,
      'hover-activate': Extensions.HoverActivate,
    },
  });

  return new ExtGraph({
    ...context,
    type: 'graph',
    layout: {
      type: 'grid',
    },
    edge: {
      keyShape: {
        lineWidth: 3,
      },
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
    },
    node: (nodeInnerModel: any) => {
      const { id, data } = nodeInnerModel;
      return {
        id,
        data: {
          ...data,
          // keyShape: {
          //   height: 50,
          //   width: 50,
          // },
          labelShape: {
            text: 'label',
            position: 'bottom',
          },
          labelBackgroundShape: {
            fill: 'red',
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
        },
      };
    },
    data: {
      nodes: [
        {
          id: 'node1',
          data: {
            type: 'rect-node',
          },
        },
        {
          id: 'node2',
          data: {
            type: 'star-node',
          },
        },
        { id: 'node3', data: {} },
        { id: 'node4', data: {} },
        { id: 'node5', data: {} },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: {},
        },
        {
          id: 'edge277777777777',
          source: 'node1',
          target: 'node3',
          data: {
            // type: 'cubic-edge',
          },
        },
        {
          id: 'edge3',
          source: 'node1',
          target: 'node4',
          data: {
            // type: 'cubic-edge',
          },
        },
        {
          id: 'edge4',
          source: 'node2',
          target: 'node3',
          data: {},
        },
        {
          id: 'edge5',
          source: 'node3',
          target: 'node4',
          data: {
            // type: 'cubic-edge'
          },
        },
        { id: 'edge6', source: 'node4', target: 'node5', data: {} },
      ],
    },
    modes: {
      default: [
        {
          type: 'zoom-canvas',
          fixSelectedItems: {
            fixAll: true,
          },
        },
        'drag-node',
        'drag-canvas',
        'click-select',
        'hover-activate',
      ],
    },
  });
};
