import G6 from '../../../src/index';
import { TestCaseContext } from '../interface';

const data = {
  nodes: [
    {
      id: '0',
      data: {
        label: '0',
      },
    },
    {
      id: '1',
      data: {
        label: '1',
      },
    },
    {
      id: '2',
      data: {
        label: '2',
      },
    },
    {
      id: '3',
      data: {
        label: '3',
      },
    },
    {
      id: '4',
      data: {
        label: '4',
        parentId: 'A',
      },
    },
    {
      id: '5',
      data: {
        label: '5',
        parentId: 'B',
      },
    },
    {
      id: '6',
      data: {
        label: '6',
        parentId: 'A',
      },
    },
    {
      id: '7',
      data: {
        label: '7',
        parentId: 'C',
      },
    },
    {
      id: '8',
      data: {
        label: '8',
        parentId: 'C',
      },
    },
    {
      id: '9',
      data: {
        label: '9',
        parentId: 'A',
      },
    },
    {
      id: '10',
      data: {
        label: '10',
        parentId: 'B',
      },
    },
    {
      id: '11',
      data: {
        label: '11',
        parentId: 'B',
      },
    },
  ],
  edges: [
    {
      id: 'edge-102',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-161',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-237',
      source: '1',
      target: '4',
    },
    {
      id: 'edge-253',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-133',
      source: '3',
      target: '4',
    },
    {
      id: 'edge-320',
      source: '2',
      target: '5',
    },
    {
      id: 'edge-355',
      source: '1',
      target: '6',
    },
    {
      id: 'edge-823',
      source: '1',
      target: '7',
    },
    {
      id: 'edge-665',
      source: '3',
      target: '8',
    },
    {
      id: 'edge-884',
      source: '3',
      target: '9',
    },
    {
      id: 'edge-536',
      source: '5',
      target: '10',
    },
    {
      id: 'edge-401',
      source: '5',
      target: '11',
    },
  ],
  combos: [
    {
      id: 'A',
      data: {
        text: 'combo A',
      },
    },
    {
      id: 'B',
      data: {
        label: 'combo B',
      },
    },
    {
      id: 'C',
      data: {
        label: 'combo C',
      },
    },
  ],
};

export default (context: TestCaseContext) => {
  const graph = new G6.Graph({
    ...context,
    autoFit: 'view',
    modes: {
      default: [
        'drag-combo',
        'drag-node',
        'drag-canvas',
        'zoom-canvas',
        'collapse-expand-combo',
      ],
    },
    layout: {
      type: 'dagre',
      ranksep: 50,
      nodesep: 30,
    },
    theme: {
      type: 'spec',
      base: 'light',
      specification: {
        node: {
          dataTypeField: 'parentId',
        },
      },
    },
    node: (model) => {
      const { id, data } = model;
      return {
        id,
        data: {
          ...data,
          type: 'rect-node',
          lodStrategy: {},
          keyShape: {
            width: 60,
            height: 30,
            radius: 8,
          },
          labelShape: {
            position: 'center',
            text: id,
          },
          anchorPoints: [
            [0.5, 0],
            [0.5, 1],
          ],
        },
      };
    },
    combo: (model) => {
      const { id, data } = model;
      return {
        id,
        data: {
          ...data,
          type: 'rect-combo',
          keyShape: {
            opacity: 0.8,
            padding: [20, 20, 20, 20],
            radius: 8,
          },
          labelShape: {
            text: `Combo ${id}`,
            offsetY: 8,
          },
          labelBackgroundShape: {},
          animates: {
            update: [
              {
                fields: ['width', 'height', 'x', 'y'],
                shapeId: 'keyShape',
              },
            ],
          },
        },
      };
    },
    data,
  });

  let sortByCombo = false;
  graph.on('canvas:click', (e) => {
    sortByCombo = !sortByCombo;
    graph.layout({
      type: 'dagre',
      sortByCombo,
    });
  });
  return graph;
};
