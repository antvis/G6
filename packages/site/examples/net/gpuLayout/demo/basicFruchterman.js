import { Graph, extend } from '@antv/g6';
// import by this way in your project. 在您的项目中请这样引入
// import { registry as layoutRegistry } from '@antv/layout-gpu';

const layoutGPU = window.layoutGPU; // GPU layout is not built-in G6 stbLib, you need to exend G6 with it.
const ExtGraph = extend(Graph, {
  layouts: {
    'fruchterman-gpu': layoutGPU.FruchtermanLayout,
  },
});

const data = {
  nodes: [
    {
      id: '0',
      data: {
        label: '0',
        cluster: 'a',
      },
    },
    {
      id: '1',
      data: {
        label: '1',
        cluster: 'a',
      },
    },
    {
      id: '2',
      data: {
        label: '2',
        cluster: 'a',
      },
    },
    {
      id: '3',
      data: {
        label: '3',
        cluster: 'a',
      },
    },
    {
      id: '4',
      data: {
        label: '4',
        cluster: 'a',
      },
    },
    {
      id: '5',
      data: {
        label: '5',
        cluster: 'a',
      },
    },
    {
      id: '6',
      data: {
        label: '6',
        cluster: 'a',
      },
    },
    {
      id: '7',
      data: {
        label: '7',
        cluster: 'a',
      },
    },
    {
      id: '8',
      data: {
        label: '8',
        cluster: 'a',
      },
    },
    {
      id: '9',
      data: {
        label: '9',
        cluster: 'a',
      },
    },
    {
      id: '10',
      data: {
        label: '10',
        cluster: 'a',
      },
    },
    {
      id: '11',
      data: {
        label: '11',
        cluster: 'a',
      },
    },
    {
      id: '12',
      data: {
        label: '12',
        cluster: 'a',
      },
    },
    {
      id: '13',
      data: {
        label: '13',
        cluster: 'b',
      },
    },
    {
      id: '14',
      data: {
        label: '14',
        cluster: 'b',
      },
    },
    {
      id: '15',
      data: {
        label: '15',
        cluster: 'b',
      },
    },
    {
      id: '16',
      data: {
        label: '16',
        cluster: 'b',
      },
    },
    {
      id: '17',
      data: {
        label: '17',
        cluster: 'b',
      },
    },
    {
      id: '18',
      data: {
        label: '18',
        cluster: 'c',
      },
    },
    {
      id: '19',
      data: {
        label: '19',
        cluster: 'c',
      },
    },
    {
      id: '20',
      data: {
        label: '20',
        cluster: 'c',
      },
    },
    {
      id: '21',
      data: {
        label: '21',
        cluster: 'c',
      },
    },
    {
      id: '22',
      data: {
        label: '22',
        cluster: 'c',
      },
    },
    {
      id: '23',
      data: {
        label: '23',
        cluster: 'c',
      },
    },
    {
      id: '24',
      data: {
        label: '24',
        cluster: 'c',
      },
    },
    {
      id: '25',
      data: {
        label: '25',
        cluster: 'c',
      },
    },
    {
      id: '26',
      data: {
        label: '26',
        cluster: 'c',
      },
    },
    {
      id: '27',
      data: {
        label: '27',
        cluster: 'c',
      },
    },
    {
      id: '28',
      data: {
        label: '28',
        cluster: 'c',
      },
    },
    {
      id: '29',
      data: {
        label: '29',
        cluster: 'c',
      },
    },
    {
      id: '30',
      data: {
        label: '30',
        cluster: 'c',
      },
    },
    {
      id: '31',
      data: {
        label: '31',
        cluster: 'd',
      },
    },
    {
      id: '32',
      data: {
        label: '32',
        cluster: 'd',
      },
    },
    {
      id: '33',
      data: {
        label: '33',
        cluster: 'd',
      },
    },
  ],
  edges: [
    {
      id: 'edge-997',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-631',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-852',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-757',
      source: '0',
      target: '4',
    },
    {
      id: 'edge-912',
      source: '0',
      target: '5',
    },
    {
      id: 'edge-780',
      source: '0',
      target: '7',
    },
    {
      id: 'edge-497',
      source: '0',
      target: '8',
    },
    {
      id: 'edge-506',
      source: '0',
      target: '9',
    },
    {
      id: 'edge-650',
      source: '0',
      target: '10',
    },
    {
      id: 'edge-145',
      source: '0',
      target: '11',
    },
    {
      id: 'edge-91',
      source: '0',
      target: '13',
    },
    {
      id: 'edge-838',
      source: '0',
      target: '14',
    },
    {
      id: 'edge-183',
      source: '0',
      target: '15',
    },
    {
      id: 'edge-540',
      source: '0',
      target: '16',
    },
    {
      id: 'edge-569',
      source: '2',
      target: '3',
    },
    {
      id: 'edge-131',
      source: '4',
      target: '5',
    },
    {
      id: 'edge-875',
      source: '4',
      target: '6',
    },
    {
      id: 'edge-189',
      source: '5',
      target: '6',
    },
    {
      id: 'edge-295',
      source: '7',
      target: '13',
    },
    {
      id: 'edge-927',
      source: '8',
      target: '14',
    },
    {
      id: 'edge-519',
      source: '9',
      target: '10',
    },
    {
      id: 'edge-411',
      source: '10',
      target: '22',
    },
    {
      id: 'edge-430',
      source: '10',
      target: '14',
    },
    {
      id: 'edge-61',
      source: '10',
      target: '12',
    },
    {
      id: 'edge-812',
      source: '10',
      target: '24',
    },
    {
      id: 'edge-957',
      source: '10',
      target: '21',
    },
    {
      id: 'edge-588',
      source: '10',
      target: '20',
    },
    {
      id: 'edge-249',
      source: '11',
      target: '24',
    },
    {
      id: 'edge-814',
      source: '11',
      target: '22',
    },
    {
      id: 'edge-596',
      source: '11',
      target: '14',
    },
    {
      id: 'edge-664',
      source: '12',
      target: '13',
    },
    {
      id: 'edge-556',
      source: '16',
      target: '17',
    },
    {
      id: 'edge-254',
      source: '16',
      target: '18',
    },
    {
      id: 'edge-376',
      source: '16',
      target: '21',
    },
    {
      id: 'edge-813',
      source: '16',
      target: '22',
    },
    {
      id: 'edge-262',
      source: '17',
      target: '18',
    },
    {
      id: 'edge-287',
      source: '17',
      target: '20',
    },
    {
      id: 'edge-874',
      source: '18',
      target: '19',
    },
    {
      id: 'edge-395',
      source: '19',
      target: '20',
    },
    {
      id: 'edge-26',
      source: '19',
      target: '33',
    },
    {
      id: 'edge-890',
      source: '19',
      target: '22',
    },
    {
      id: 'edge-795',
      source: '19',
      target: '23',
    },
    {
      id: 'edge-59',
      source: '20',
      target: '21',
    },
    {
      id: 'edge-878',
      source: '21',
      target: '22',
    },
    {
      id: 'edge-585',
      source: '22',
      target: '24',
    },
    {
      id: 'edge-27',
      source: '22',
      target: '25',
    },
    {
      id: 'edge-578',
      source: '22',
      target: '26',
    },
    {
      id: 'edge-113',
      source: '22',
      target: '23',
    },
    {
      id: 'edge-65',
      source: '22',
      target: '28',
    },
    {
      id: 'edge-133',
      source: '22',
      target: '30',
    },
    {
      id: 'edge-512',
      source: '22',
      target: '31',
    },
    {
      id: 'edge-728',
      source: '22',
      target: '32',
    },
    {
      id: 'edge-150',
      source: '22',
      target: '33',
    },
    {
      id: 'edge-30',
      source: '23',
      target: '28',
    },
    {
      id: 'edge-839',
      source: '23',
      target: '27',
    },
    {
      id: 'edge-572',
      source: '23',
      target: '29',
    },
    {
      id: 'edge-29',
      source: '23',
      target: '30',
    },
    {
      id: 'edge-811',
      source: '23',
      target: '31',
    },
    {
      id: 'edge-653',
      source: '23',
      target: '33',
    },
    {
      id: 'edge-53',
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
  theme: {
    type: 'spec',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  edge: {
    keyShape: {
      startArrow: true,
    },
  },
  layout: {
    type: 'fruchterman-gpu',
    speed: 10,
    // gpuEnabled: true,
    maxIteration: 2000,
  },
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
