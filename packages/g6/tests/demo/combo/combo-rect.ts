import G6 from '../../../src/index';
import { container, height, width } from '../../datasets/const';
export default () => {
  const graph = new G6.Graph({
    container,
    width,
    height,
    type: 'graph',
    layout: {
      type: 'grid',
    },
    node: {
      labelShape: {
        position: 'center',
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
      animates: {
        update: [
          {
            fields: ['opacity'],
            shapeId: 'haloShape',
          },
        ],
      },
    },
    combo: (model) => {
      return {
        id: model.id,
        data: {
          ...model.data,
          type: 'rect-combo',
          keyShape: {
            padding: [10, 20, 30, 40],
            width: 50,
            height: 20,
          },
          labelShape: {
            text: model.id,
          },

          animates: {
            buildIn: [
              {
                fields: ['opacity'],
                duration: 500,
                delay: 500 + Math.random() * 500,
              },
            ],
            buildOut: [
              {
                fields: ['opacity'],
                duration: 200,
              },
            ],
            update: [
              {
                // when rect combo collapased, rect's  width/height/x/y are all changed,
                // which is different from circle that the x/y of circle does not change.
                fields: ['lineWidth', 'width', 'height', 'x', 'y'],
                shapeId: 'keyShape',
              },
              {
                fields: ['opacity'],
                shapeId: 'haloShape',
              },
            ],
          },
        },
      };
    },
    data: {
      nodes: [
        // { id: 'node1', data: {} },
        // { id: 'node2', data: {} },
        // { id: 'node3', data: {} },
        { id: 'node1', data: { parentId: 'combo1' } },
        { id: 'node2', data: { parentId: 'combo1' } },
        { id: 'node3', data: { parentId: 'combo2' } },
        { id: 'node4', data: { parentId: 'combo1' } },
        { id: 'node5', data: {} },
      ],
      edges: [
        { id: 'edge1', source: 'node1', target: 'node2', data: {} },
        { id: 'edge2', source: 'node1', target: 'node3', data: {} },
        { id: 'edge3', source: 'node1', target: 'node4', data: {} },
        { id: 'edge4', source: 'node2', target: 'node3', data: {} },
        { id: 'edge5', source: 'node3', target: 'node4', data: {} },
        { id: 'edge6', source: 'node4', target: 'node5', data: {} },
        // { id: 'edge7', source: 'node5', target: 'combo1', data: {} },
      ],
      combos: [
        { id: 'combo1', data: { parentId: 'combo2' } }, // collapsed: true
        { id: 'combo2', data: {} },
        { id: 'combo3', data: {} },
      ],
    },
    modes: {
      default: [
        'collapse-expand-combo',
        'drag-canvas',
        {
          type: 'click-select',
          itemTypes: ['node', 'edge', 'combo'],
        },
        {
          type: 'hover-activate',
          itemTypes: ['node', 'edge', 'combo'],
        },
        {
          type: 'drag-combo',
          enableTransient: true,
          updateComboStructure: true,
        },
        {
          type: 'drag-node',
          enableTransient: true,
          updateComboStructure: true,
        },
      ],
    },
  });
  return graph;
};
