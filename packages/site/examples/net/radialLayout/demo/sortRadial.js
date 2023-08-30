import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  layouts: {
    radial: Extensions.RadialLayout,
  },
});

const data = {
  nodes: [
    {
      id: '0',
      data: {
        sortAttr: 0,
        sortAttr2: 'a',
      },
    },
    {
      id: '1',
      data: {
        sortAttr: 0,
        sortAttr2: 'a',
      },
    },
    {
      id: '2',
      data: {
        sortAttr: 0,
        sortAttr2: 'a',
      },
    },
    {
      id: '3',
      data: {
        sortAttr: 0,
        sortAttr2: 'a',
      },
    },
    {
      id: '4',
      data: {
        sortAttr: 2,
        sortAttr2: 'c',
      },
    },
    {
      id: '5',
      data: {
        sortAttr: 0,
        sortAttr2: 'a',
      },
    },
    {
      id: '6',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '7',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '8',
      data: {
        sortAttr: 2,
        sortAttr2: 'c',
      },
    },
    {
      id: '9',
      data: {
        sortAttr: 3,
        sortAttr2: 'd',
      },
    },
    {
      id: '10',
      data: {
        sortAttr: 3,
        sortAttr2: 'd',
      },
    },
    {
      id: '11',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '12',
      data: {
        sortAttr: 2,
        sortAttr2: 'c',
      },
    },
    {
      id: '13',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '14',
      data: {
        sortAttr: 3,
        sortAttr2: 'd',
      },
    },
    {
      id: '15',
      data: {
        sortAttr: 3,
        sortAttr2: 'd',
      },
    },
    {
      id: '16',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '17',
      data: {
        sortAttr: 2,
        sortAttr2: 'c',
      },
    },
    {
      id: '18',
      data: {
        sortAttr: 2,
        sortAttr2: 'c',
      },
    },
    {
      id: '19',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '20',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '21',
      data: {
        sortAttr: 3,
        sortAttr2: 'd',
      },
    },
    {
      id: '22',
      data: {
        sortAttr: 3,
        sortAttr2: 'd',
      },
    },
    {
      id: '23',
      data: {
        sortAttr: 3,
        sortAttr2: 'd',
      },
    },
    {
      id: '24',
      data: {
        sortAttr: 0,
        sortAttr2: 'a',
      },
    },
    {
      id: '25',
      data: {
        sortAttr: 0,
        sortAttr2: 'a',
      },
    },
    {
      id: '26',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '27',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '28',
      data: {
        sortAttr: 3,
        sortAttr2: 'd',
      },
    },
    {
      id: '29',
      data: {
        sortAttr: 2,
        sortAttr2: 'c',
      },
    },
    {
      id: '30',
      data: {
        sortAttr: 2,
        sortAttr2: 'c',
      },
    },
    {
      id: '31',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '32',
      data: {
        sortAttr: 1,
        sortAttr2: 'b',
      },
    },
    {
      id: '33',
      data: {
        sortAttr: 0,
        sortAttr2: 'a',
      },
    },
  ],
  edges: [
    {
      id: 'edge-985',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-136',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-745',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-270',
      source: '0',
      target: '4',
    },
    {
      id: 'edge-346',
      source: '0',
      target: '5',
    },
    {
      id: 'edge-895',
      source: '0',
      target: '7',
    },
    {
      id: 'edge-839',
      source: '0',
      target: '8',
    },
    {
      id: 'edge-114',
      source: '0',
      target: '9',
    },
    {
      id: 'edge-717',
      source: '0',
      target: '10',
    },
    {
      id: 'edge-579',
      source: '0',
      target: '11',
    },
    {
      id: 'edge-483',
      source: '0',
      target: '13',
    },
    {
      id: 'edge-460',
      source: '0',
      target: '14',
    },
    {
      id: 'edge-42',
      source: '0',
      target: '15',
    },
    {
      id: 'edge-34',
      source: '0',
      target: '16',
    },
    {
      id: 'edge-735',
      source: '2',
      target: '3',
    },
    {
      id: 'edge-669',
      source: '4',
      target: '5',
    },
    {
      id: 'edge-545',
      source: '4',
      target: '6',
    },
    {
      id: 'edge-629',
      source: '5',
      target: '6',
    },
    {
      id: 'edge-68',
      source: '7',
      target: '13',
    },
    {
      id: 'edge-233',
      source: '8',
      target: '14',
    },
    {
      id: 'edge-77',
      source: '9',
      target: '10',
    },
    {
      id: 'edge-193',
      source: '10',
      target: '22',
    },
    {
      id: 'edge-902',
      source: '10',
      target: '14',
    },
    {
      id: 'edge-306',
      source: '10',
      target: '12',
    },
    {
      id: 'edge-903',
      source: '10',
      target: '24',
    },
    {
      id: 'edge-280',
      source: '10',
      target: '21',
    },
    {
      id: 'edge-529',
      source: '10',
      target: '20',
    },
    {
      id: 'edge-972',
      source: '11',
      target: '24',
    },
    {
      id: 'edge-489',
      source: '11',
      target: '22',
    },
    {
      id: 'edge-428',
      source: '11',
      target: '14',
    },
    {
      id: 'edge-668',
      source: '12',
      target: '13',
    },
    {
      id: 'edge-862',
      source: '16',
      target: '17',
    },
    {
      id: 'edge-579',
      source: '16',
      target: '18',
    },
    {
      id: 'edge-966',
      source: '16',
      target: '21',
    },
    {
      id: 'edge-719',
      source: '16',
      target: '22',
    },
    {
      id: 'edge-309',
      source: '17',
      target: '18',
    },
    {
      id: 'edge-599',
      source: '17',
      target: '20',
    },
    {
      id: 'edge-673',
      source: '18',
      target: '19',
    },
    {
      id: 'edge-572',
      source: '19',
      target: '20',
    },
    {
      id: 'edge-139',
      source: '19',
      target: '33',
    },
    {
      id: 'edge-291',
      source: '19',
      target: '22',
    },
    {
      id: 'edge-532',
      source: '19',
      target: '23',
    },
    {
      id: 'edge-750',
      source: '20',
      target: '21',
    },
    {
      id: 'edge-537',
      source: '21',
      target: '22',
    },
    {
      id: 'edge-274',
      source: '22',
      target: '24',
    },
    {
      id: 'edge-898',
      source: '22',
      target: '25',
    },
    {
      id: 'edge-64',
      source: '22',
      target: '26',
    },
    {
      id: 'edge-904',
      source: '22',
      target: '23',
    },
    {
      id: 'edge-69',
      source: '22',
      target: '28',
    },
    {
      id: 'edge-751',
      source: '22',
      target: '30',
    },
    {
      id: 'edge-330',
      source: '22',
      target: '31',
    },
    {
      id: 'edge-136',
      source: '22',
      target: '32',
    },
    {
      id: 'edge-595',
      source: '22',
      target: '33',
    },
    {
      id: 'edge-308',
      source: '23',
      target: '28',
    },
    {
      id: 'edge-372',
      source: '23',
      target: '27',
    },
    {
      id: 'edge-214',
      source: '23',
      target: '29',
    },
    {
      id: 'edge-74',
      source: '23',
      target: '30',
    },
    {
      id: 'edge-512',
      source: '23',
      target: '31',
    },
    {
      id: 'edge-503',
      source: '23',
      target: '33',
    },
    {
      id: 'edge-553',
      source: '32',
      target: '33',
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
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'radial',
    unitRadius: 120,
    maxIteration: 1000,
    linkDistance: 50,
    preventOverlap: true,
    nodeSize: 30,
    sortBy: 'sortAttr2',
    sortStrength: 50,
  },
  theme: {
    type: 'spec',
    specification: {
      node: {
        dataTypeField: 'sortAttr2',
      },
    },
  },
  edge: {
    keyShape: {
      endArrow: true,
    },
  },
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
