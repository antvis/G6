import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '1',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '2',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '3',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '4',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '5',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '6',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '7',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '8',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '9',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '10',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '11',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '12',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '13',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '14',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '15',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '16',
      style: {
        parentId: 'b',
      },
    },
    {
      id: '17',
      style: {
        parentId: 'b',
      },
    },
    {
      id: '18',
      style: {
        parentId: 'b',
      },
    },
    {
      id: '19',
      style: {
        parentId: 'b',
      },
    },
    {
      id: '20',
    },
    {
      id: '21',
    },
    {
      id: '22',
    },
    {
      id: '23',
      style: {
        parentId: 'c',
      },
    },
    {
      id: '24',
      style: {
        parentId: 'a',
      },
    },
    {
      id: '25',
    },
    {
      id: '26',
    },
    {
      id: '27',
      style: {
        parentId: 'c',
      },
    },
    {
      id: '28',
      style: {
        parentId: 'c',
      },
    },
    {
      id: '29',
      style: {
        parentId: 'c',
      },
    },
    {
      id: '30',
      style: {
        parentId: 'c',
      },
    },
    {
      id: '31',
      style: {
        parentId: 'c',
      },
    },
    {
      id: '32',
      style: {
        parentId: 'd',
      },
    },
    {
      id: '33',
      style: {
        parentId: 'd',
      },
    },
  ],
  edges: [
    // {
    //   id: 'edge-647',
    //   source: 'a',
    //   target: 'b',
    //   data: {
    //     label: 'Combo A - Combo B',
    //     size: 3,
    //     color: 'red',
    //   },
    // },
    // {
    //   id: 'edge-623',
    //   source: 'a',
    //   target: '33',
    //   data: {
    //     label: 'Combo-Node',
    //     size: 3,
    //     color: 'blue',
    //   },
    // },
    {
      id: 'edge-444',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-123',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-689',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-625',
      source: '0',
      target: '4',
    },
    {
      id: 'edge-110',
      source: '0',
      target: '5',
    },
    {
      id: 'edge-783',
      source: '0',
      target: '7',
    },
    {
      id: 'edge-72',
      source: '0',
      target: '8',
    },
    {
      id: 'edge-165',
      source: '0',
      target: '9',
    },
    {
      id: 'edge-109',
      source: '0',
      target: '10',
    },
    {
      id: 'edge-764',
      source: '0',
      target: '11',
    },
    {
      id: 'edge-596',
      source: '0',
      target: '13',
    },
    {
      id: 'edge-711',
      source: '0',
      target: '14',
    },
    {
      id: 'edge-81',
      source: '0',
      target: '15',
    },
    {
      id: 'edge-810',
      source: '0',
      target: '16',
    },
    {
      id: 'edge-957',
      source: '2',
      target: '3',
    },
    {
      id: 'edge-279',
      source: '4',
      target: '5',
    },
    {
      id: 'edge-83',
      source: '4',
      target: '6',
    },
    {
      id: 'edge-488',
      source: '5',
      target: '6',
    },
    {
      id: 'edge-453',
      source: '7',
      target: '13',
    },
    {
      id: 'edge-523',
      source: '8',
      target: '14',
    },
    {
      id: 'edge-543',
      source: '9',
      target: '10',
    },
    {
      id: 'edge-30',
      source: '10',
      target: '22',
    },
    {
      id: 'edge-146',
      source: '10',
      target: '14',
    },
    {
      id: 'edge-878',
      source: '10',
      target: '12',
    },
    {
      id: 'edge-369',
      source: '10',
      target: '24',
    },
    {
      id: 'edge-179',
      source: '10',
      target: '21',
    },
    {
      id: 'edge-759',
      source: '10',
      target: '20',
    },
    {
      id: 'edge-116',
      source: '11',
      target: '24',
    },
    {
      id: 'edge-940',
      source: '11',
      target: '22',
    },
    {
      id: 'edge-538',
      source: '11',
      target: '14',
    },
    {
      id: 'edge-522',
      source: '12',
      target: '13',
    },
    {
      id: 'edge-73',
      source: '16',
      target: '17',
    },
    {
      id: 'edge-59',
      source: '16',
      target: '18',
    },
    {
      id: 'edge-493',
      source: '16',
      target: '21',
    },
    {
      id: 'edge-162',
      source: '16',
      target: '22',
    },
    {
      id: 'edge-13',
      source: '17',
      target: '18',
    },
    {
      id: 'edge-892',
      source: '17',
      target: '20',
    },
    {
      id: 'edge-722',
      source: '18',
      target: '19',
    },
    {
      id: 'edge-617',
      source: '19',
      target: '20',
    },
    {
      id: 'edge-364',
      source: '19',
      target: '33',
    },
    {
      id: 'edge-926',
      source: '19',
      target: '22',
    },
    {
      id: 'edge-31',
      source: '19',
      target: '23',
    },
    {
      id: 'edge-695',
      source: '20',
      target: '21',
    },
    {
      id: 'edge-286',
      source: '21',
      target: '22',
    },
    {
      id: 'edge-300',
      source: '22',
      target: '24',
    },
    {
      id: 'edge-503',
      source: '22',
      target: '25',
    },
    {
      id: 'edge-509',
      source: '22',
      target: '26',
    },
    {
      id: 'edge-432',
      source: '22',
      target: '23',
    },
    {
      id: 'edge-293',
      source: '22',
      target: '28',
    },
    {
      id: 'edge-785',
      source: '22',
      target: '30',
    },
    {
      id: 'edge-514',
      source: '22',
      target: '31',
    },
    {
      id: 'edge-608',
      source: '22',
      target: '32',
    },
    {
      id: 'edge-946',
      source: '22',
      target: '33',
    },
    {
      id: 'edge-728',
      source: '23',
      target: '28',
    },
    {
      id: 'edge-416',
      source: '23',
      target: '27',
    },
    {
      id: 'edge-14',
      source: '23',
      target: '29',
    },
    {
      id: 'edge-776',
      source: '23',
      target: '30',
    },
    {
      id: 'edge-736',
      source: '23',
      target: '31',
    },
    {
      id: 'edge-508',
      source: '23',
      target: '33',
    },
    {
      id: 'edge-201',
      source: '32',
      target: '33',
    },
  ],
  combos: [
    {
      id: 'a',
      data: {
        label: 'Combo A',
      },
    },
    {
      id: 'b',
      data: {
        label: 'Combo B',
      },
    },
    {
      id: 'c',
      data: {
        label: 'Combo D',
      },
    },
    {
      id: 'd',
      data: {
        label: 'Combo D',
        parentId: 'b',
      },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'combo-combined',
    comboPadding: 2,
  },
  node: {
    style: {
      size: 20,
      labelText: (d) => d.id,
    },
  },
  edge: {
    style: (model) => {
      const { size, color } = model.data as { size: number; color: string };
      return {
        stroke: color || '#99ADD1',
        lineWidth: size || 1,
      };
    },
  },
  behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
  autoFit: 'view',
});

graph.render();
