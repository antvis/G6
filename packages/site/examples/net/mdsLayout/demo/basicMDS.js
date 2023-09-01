import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  layouts: {
    mds: Extensions.MDSLayout,
  },
  behaviors: {
    'brush-select': Extensions.BrushSelect,
  },
});

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
      },
    },
    {
      id: '5',
      data: {
        label: '5',
      },
    },
    {
      id: '6',
      data: {
        label: '6',
      },
    },
    {
      id: '7',
      data: {
        label: '7',
      },
    },
    {
      id: '8',
      data: {
        label: '8',
      },
    },
    {
      id: '9',
      data: {
        label: '9',
      },
    },
    {
      id: '10',
      data: {
        label: '10',
      },
    },
    {
      id: '11',
      data: {
        label: '11',
      },
    },
    {
      id: '12',
      data: {
        label: '12',
      },
    },
    {
      id: '13',
      data: {
        label: '13',
      },
    },
    {
      id: '14',
      data: {
        label: '14',
      },
    },
    {
      id: '15',
      data: {
        label: '15',
      },
    },
    {
      id: '16',
      data: {
        label: '16',
      },
    },
    {
      id: '17',
      data: {
        label: '17',
      },
    },
    {
      id: '18',
      data: {
        label: '18',
      },
    },
    {
      id: '19',
      data: {
        label: '19',
      },
    },
    {
      id: '20',
      data: {
        label: '20',
      },
    },
    {
      id: '21',
      data: {
        label: '21',
      },
    },
    {
      id: '22',
      data: {
        label: '22',
      },
    },
    {
      id: '23',
      data: {
        label: '23',
      },
    },
    {
      id: '24',
      data: {
        label: '24',
      },
    },
    {
      id: '25',
      data: {
        label: '25',
      },
    },
    {
      id: '26',
      data: {
        label: '26',
      },
    },
    {
      id: '27',
      data: {
        label: '27',
      },
    },
    {
      id: '28',
      data: {
        label: '28',
      },
    },
    {
      id: '29',
      data: {
        label: '29',
      },
    },
    {
      id: '30',
      data: {
        label: '30',
      },
    },
    {
      id: '31',
      data: {
        label: '31',
      },
    },
    {
      id: '32',
      data: {
        label: '32',
      },
    },
    {
      id: '33',
      data: {
        label: '33',
      },
    },
  ],
  edges: [
    {
      id: 'edge-667',
      source: '0',
      target: '1',
      data: {},
    },
    {
      id: 'edge-997',
      source: '0',
      target: '2',
      data: {},
    },
    {
      id: 'edge-422',
      source: '0',
      target: '3',
      data: {},
    },
    {
      id: 'edge-188',
      source: '0',
      target: '4',
      data: {},
    },
    {
      id: 'edge-332',
      source: '0',
      target: '5',
      data: {},
    },
    {
      id: 'edge-148',
      source: '0',
      target: '7',
      data: {},
    },
    {
      id: 'edge-883',
      source: '0',
      target: '8',
      data: {},
    },
    {
      id: 'edge-532',
      source: '0',
      target: '9',
      data: {},
    },
    {
      id: 'edge-968',
      source: '0',
      target: '10',
      data: {},
    },
    {
      id: 'edge-965',
      source: '0',
      target: '11',
      data: {},
    },
    {
      id: 'edge-285',
      source: '0',
      target: '13',
      data: {},
    },
    {
      id: 'edge-320',
      source: '0',
      target: '14',
      data: {},
    },
    {
      id: 'edge-644',
      source: '0',
      target: '15',
      data: {},
    },
    {
      id: 'edge-208',
      source: '0',
      target: '16',
      data: {},
    },
    {
      id: 'edge-690',
      source: '2',
      target: '3',
      data: {},
    },
    {
      id: 'edge-481',
      source: '4',
      target: '5',
      data: {},
    },
    {
      id: 'edge-956',
      source: '4',
      target: '6',
      data: {},
    },
    {
      id: 'edge-344',
      source: '5',
      target: '6',
      data: {},
    },
    {
      id: 'edge-618',
      source: '7',
      target: '13',
      data: {},
    },
    {
      id: 'edge-793',
      source: '8',
      target: '14',
      data: {},
    },
    {
      id: 'edge-330',
      source: '9',
      target: '10',
      data: {},
    },
    {
      id: 'edge-977',
      source: '10',
      target: '22',
      data: {},
    },
    {
      id: 'edge-633',
      source: '10',
      target: '14',
      data: {},
    },
    {
      id: 'edge-809',
      source: '10',
      target: '12',
      data: {},
    },
    {
      id: 'edge-535',
      source: '10',
      target: '24',
      data: {},
    },
    {
      id: 'edge-665',
      source: '10',
      target: '21',
      data: {},
    },
    {
      id: 'edge-202',
      source: '10',
      target: '20',
      data: {},
    },
    {
      id: 'edge-803',
      source: '11',
      target: '24',
      data: {},
    },
    {
      id: 'edge-276',
      source: '11',
      target: '22',
      data: {},
    },
    {
      id: 'edge-588',
      source: '11',
      target: '14',
      data: {},
    },
    {
      id: 'edge-709',
      source: '12',
      target: '13',
      data: {},
    },
    {
      id: 'edge-207',
      source: '16',
      target: '17',
      data: {},
    },
    {
      id: 'edge-795',
      source: '16',
      target: '18',
      data: {},
    },
    {
      id: 'edge-321',
      source: '16',
      target: '21',
      data: {},
    },
    {
      id: 'edge-97',
      source: '16',
      target: '22',
      data: {},
    },
    {
      id: 'edge-522',
      source: '17',
      target: '18',
      data: {},
    },
    {
      id: 'edge-368',
      source: '17',
      target: '20',
      data: {},
    },
    {
      id: 'edge-769',
      source: '18',
      target: '19',
      data: {},
    },
    {
      id: 'edge-673',
      source: '19',
      target: '20',
      data: {},
    },
    {
      id: 'edge-589',
      source: '19',
      target: '33',
      data: {},
    },
    {
      id: 'edge-574',
      source: '19',
      target: '22',
      data: {},
    },
    {
      id: 'edge-466',
      source: '19',
      target: '23',
      data: {},
    },
    {
      id: 'edge-400',
      source: '20',
      target: '21',
      data: {},
    },
    {
      id: 'edge-552',
      source: '21',
      target: '22',
      data: {},
    },
    {
      id: 'edge-192',
      source: '22',
      target: '24',
      data: {},
    },
    {
      id: 'edge-119',
      source: '22',
      target: '25',
      data: {},
    },
    {
      id: 'edge-305',
      source: '22',
      target: '26',
      data: {},
    },
    {
      id: 'edge-518',
      source: '22',
      target: '23',
      data: {},
    },
    {
      id: 'edge-950',
      source: '22',
      target: '28',
      data: {},
    },
    {
      id: 'edge-57',
      source: '22',
      target: '30',
      data: {},
    },
    {
      id: 'edge-634',
      source: '22',
      target: '31',
      data: {},
    },
    {
      id: 'edge-875',
      source: '22',
      target: '32',
      data: {},
    },
    {
      id: 'edge-559',
      source: '22',
      target: '33',
      data: {},
    },
    {
      id: 'edge-894',
      source: '23',
      target: '28',
      data: {},
    },
    {
      id: 'edge-831',
      source: '23',
      target: '27',
      data: {},
    },
    {
      id: 'edge-172',
      source: '23',
      target: '29',
      data: {},
    },
    {
      id: 'edge-137',
      source: '23',
      target: '30',
      data: {},
    },
    {
      id: 'edge-136',
      source: '23',
      target: '31',
      data: {},
    },
    {
      id: 'edge-878',
      source: '23',
      target: '33',
      data: {},
    },
    {
      id: 'edge-121',
      source: '32',
      target: '33',
      data: {},
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
  autoFit: 'view',
  layout: {
    type: 'mds',
    linkDistance: 100,
  },
  modes: {
    default: ['drag-node', 'drag-canvas', 'zoom-canvas', 'click-select', 'brush-select'],
  },
  node: (model) => {
    const { id, data } = model;
    return {
      id,
      data: {
        ...data,
        labelShape: {
          text: data.label,
        },
        labelBackgroundShape: {},
        animates: {
          update: [
            {
              fields: ['opacity'],
              shapeId: 'haloShape',
            },
            {
              fields: ['lineWidth'],
              shapeId: 'keyShape',
            },
          ],
        },
      },
    };
  },
  edge: (model) => ({
    ...model,
    data: {
      animates: {
        update: [
          {
            fields: ['opacity'],
            shapeId: 'haloShape',
          },
          {
            fields: ['lineWidth'],
            shapeId: 'keyShape',
          },
        ],
      },
    },
  }),
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
