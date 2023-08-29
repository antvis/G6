import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  layouts: {
    comboCombined: Extensions.ComboCombinedLayout,
  },
});

const data = {
  nodes: [
    {
      id: '0',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '1',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '2',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '3',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '4',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '5',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '6',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '7',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '8',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '9',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '10',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '11',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '12',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '13',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '14',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '15',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '16',
      data: {
        parentId: 'b',
      },
    },
    {
      id: '17',
      data: {
        parentId: 'b',
      },
    },
    {
      id: '18',
      data: {
        parentId: 'b',
      },
    },
    {
      id: '19',
      data: {
        parentId: 'b',
      },
    },
    {
      id: '20',
      data: {},
    },
    {
      id: '21',
      data: {},
    },
    {
      id: '22',
      data: {},
    },
    {
      id: '23',
      data: {
        parentId: 'c',
      },
    },
    {
      id: '24',
      data: {
        parentId: 'a',
      },
    },
    {
      id: '25',
      data: {},
    },
    {
      id: '26',
      data: {},
    },
    {
      id: '27',
      data: {
        parentId: 'c',
      },
    },
    {
      id: '28',
      data: {
        parentId: 'c',
      },
    },
    {
      id: '29',
      data: {
        parentId: 'c',
      },
    },
    {
      id: '30',
      data: {
        parentId: 'c',
      },
    },
    {
      id: '31',
      data: {
        parentId: 'c',
      },
    },
    {
      id: '32',
      data: {
        parentId: 'd',
      },
    },
    {
      id: '33',
      data: {
        parentId: 'd',
      },
    },
  ],
  edges: [
    {
      id: 'edge-647',
      source: 'a',
      target: 'b',
      data: {
        label: 'Combo A - Combo B',
        size: 3,
        color: 'red',
      },
    },
    {
      id: 'edge-623',
      source: 'a',
      target: '33',
      data: {
        label: 'Combo-Node',
        size: 3,
        color: 'blue',
      },
    },
    {
      id: 'edge-444',
      source: '0',
      target: '1',
      data: {},
    },
    {
      id: 'edge-123',
      source: '0',
      target: '2',
      data: {},
    },
    {
      id: 'edge-689',
      source: '0',
      target: '3',
      data: {},
    },
    {
      id: 'edge-625',
      source: '0',
      target: '4',
      data: {},
    },
    {
      id: 'edge-110',
      source: '0',
      target: '5',
      data: {},
    },
    {
      id: 'edge-783',
      source: '0',
      target: '7',
      data: {},
    },
    {
      id: 'edge-72',
      source: '0',
      target: '8',
      data: {},
    },
    {
      id: 'edge-165',
      source: '0',
      target: '9',
      data: {},
    },
    {
      id: 'edge-109',
      source: '0',
      target: '10',
      data: {},
    },
    {
      id: 'edge-764',
      source: '0',
      target: '11',
      data: {},
    },
    {
      id: 'edge-596',
      source: '0',
      target: '13',
      data: {},
    },
    {
      id: 'edge-711',
      source: '0',
      target: '14',
      data: {},
    },
    {
      id: 'edge-81',
      source: '0',
      target: '15',
      data: {},
    },
    {
      id: 'edge-810',
      source: '0',
      target: '16',
      data: {},
    },
    {
      id: 'edge-957',
      source: '2',
      target: '3',
      data: {},
    },
    {
      id: 'edge-279',
      source: '4',
      target: '5',
      data: {},
    },
    {
      id: 'edge-83',
      source: '4',
      target: '6',
      data: {},
    },
    {
      id: 'edge-488',
      source: '5',
      target: '6',
      data: {},
    },
    {
      id: 'edge-453',
      source: '7',
      target: '13',
      data: {},
    },
    {
      id: 'edge-523',
      source: '8',
      target: '14',
      data: {},
    },
    {
      id: 'edge-543',
      source: '9',
      target: '10',
      data: {},
    },
    {
      id: 'edge-30',
      source: '10',
      target: '22',
      data: {},
    },
    {
      id: 'edge-146',
      source: '10',
      target: '14',
      data: {},
    },
    {
      id: 'edge-878',
      source: '10',
      target: '12',
      data: {},
    },
    {
      id: 'edge-369',
      source: '10',
      target: '24',
      data: {},
    },
    {
      id: 'edge-179',
      source: '10',
      target: '21',
      data: {},
    },
    {
      id: 'edge-759',
      source: '10',
      target: '20',
      data: {},
    },
    {
      id: 'edge-116',
      source: '11',
      target: '24',
      data: {},
    },
    {
      id: 'edge-940',
      source: '11',
      target: '22',
      data: {},
    },
    {
      id: 'edge-538',
      source: '11',
      target: '14',
      data: {},
    },
    {
      id: 'edge-522',
      source: '12',
      target: '13',
      data: {},
    },
    {
      id: 'edge-73',
      source: '16',
      target: '17',
      data: {},
    },
    {
      id: 'edge-59',
      source: '16',
      target: '18',
      data: {},
    },
    {
      id: 'edge-493',
      source: '16',
      target: '21',
      data: {},
    },
    {
      id: 'edge-162',
      source: '16',
      target: '22',
      data: {},
    },
    {
      id: 'edge-13',
      source: '17',
      target: '18',
      data: {},
    },
    {
      id: 'edge-892',
      source: '17',
      target: '20',
      data: {},
    },
    {
      id: 'edge-722',
      source: '18',
      target: '19',
      data: {},
    },
    {
      id: 'edge-617',
      source: '19',
      target: '20',
      data: {},
    },
    {
      id: 'edge-364',
      source: '19',
      target: '33',
      data: {},
    },
    {
      id: 'edge-926',
      source: '19',
      target: '22',
      data: {},
    },
    {
      id: 'edge-31',
      source: '19',
      target: '23',
      data: {},
    },
    {
      id: 'edge-695',
      source: '20',
      target: '21',
      data: {},
    },
    {
      id: 'edge-286',
      source: '21',
      target: '22',
      data: {},
    },
    {
      id: 'edge-300',
      source: '22',
      target: '24',
      data: {},
    },
    {
      id: 'edge-503',
      source: '22',
      target: '25',
      data: {},
    },
    {
      id: 'edge-509',
      source: '22',
      target: '26',
      data: {},
    },
    {
      id: 'edge-432',
      source: '22',
      target: '23',
      data: {},
    },
    {
      id: 'edge-293',
      source: '22',
      target: '28',
      data: {},
    },
    {
      id: 'edge-785',
      source: '22',
      target: '30',
      data: {},
    },
    {
      id: 'edge-514',
      source: '22',
      target: '31',
      data: {},
    },
    {
      id: 'edge-608',
      source: '22',
      target: '32',
      data: {},
    },
    {
      id: 'edge-946',
      source: '22',
      target: '33',
      data: {},
    },
    {
      id: 'edge-728',
      source: '23',
      target: '28',
      data: {},
    },
    {
      id: 'edge-416',
      source: '23',
      target: '27',
      data: {},
    },
    {
      id: 'edge-14',
      source: '23',
      target: '29',
      data: {},
    },
    {
      id: 'edge-776',
      source: '23',
      target: '30',
      data: {},
    },
    {
      id: 'edge-736',
      source: '23',
      target: '31',
      data: {},
    },
    {
      id: 'edge-508',
      source: '23',
      target: '33',
      data: {},
    },
    {
      id: 'edge-201',
      source: '32',
      target: '33',
      data: {},
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

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'comboCombined',
    comboPadding: 2,
  },
  autoFit: 'center',
  node: {
    keyShape: {
      r: 10,
    },
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (node) => node.id,
      },
    },
  },
  edge: (model) => {
    return {
      ...model,
      data: {
        ...model.data,
        keyShape: {
          lineWidth: model.data.size || 1,
          stroke: model.data.color || '#99ADD1',
        },
        labelShape: {
          text: model.data.label || '',
        },
        labelBackgroundShape: {},
      },
    };
  },
  combo: {
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
  modes: {
    default: ['drag-combo', 'click-select', 'drag-node', 'drag-canvas', 'zoom-canvas', 'collapse-expand-combo'],
  },
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
