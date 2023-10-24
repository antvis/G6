import { Graph, Extensions, extend } from '../../../src/index';

export default (
  context,
  options: {
    disableAnimate?: boolean;
    comboType?: 'circle-combo' | 'rect-combo';
  } = {},
) => {
  const { disableAnimate = false, comboType = 'circle-combo' } = options;
  const ExtGraph = extend(Graph, {
    behaviors: {
      'hover-activate': Extensions.HoverActivate,
    },
  });
  const graph = new ExtGraph({
    ...context,
    layout: {
      type: 'grid',
    },
    stackCfg: {
      ignoreStateChange: true,
    },
    node: {
      labelShape: {
        position: 'center',
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
      animates: disableAnimate
        ? {}
        : {
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
          type: comboType,
          ...model.data,
          keyShape: {
            padding: [10, 20, 30, 40],
            r: 50,
          },
          labelShape: {
            text: model.id,
          },

          animates: disableAnimate
            ? {}
            : {
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
                    fields: ['lineWidth', 'r'],
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
        // 'drag-node',
        {
          type: 'drag-node',
          enableTransient: false,
          updateComboStructure: false,
        },
        'zoom-canvas',
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
      ],
    },
  });
  graph.on('canvas:click', (e) => {
    // graph.removeData('combo', 'combo1');
    graph.updateData('node', {
      id: 'node5',
      data: {
        parentId: 'combo3',
      },
    });
  });
  return graph;
};
