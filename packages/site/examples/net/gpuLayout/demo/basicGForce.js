// TODO: disable this demo temporary since gForce is not correct.

import { Graph, extend } from '@antv/g6';
// import by this way in your project. 在您的项目中请这样引入
// import { registry as layoutRegistry } from '@antv/layout-gpu';

const layoutGPU = window.layoutGPU;
// GPU layout is not built-in G6 stbLib, you need to exend G6 with it.
const CustomGraph = extend(Graph, {
  layouts: {
    'gForce-gpu': layoutGPU.GForceLayout,
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
      id: 'edge-6295',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-9870',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-2656',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-7789',
      source: '0',
      target: '4',
    },
    {
      id: 'edge-4078',
      source: '0',
      target: '5',
    },
    {
      id: 'edge-9413',
      source: '0',
      target: '7',
    },
    {
      id: 'edge-5236',
      source: '0',
      target: '8',
    },
    {
      id: 'edge-7823',
      source: '0',
      target: '9',
    },
    {
      id: 'edge-4697',
      source: '0',
      target: '10',
    },
    {
      id: 'edge-9387',
      source: '0',
      target: '11',
    },
    {
      id: 'edge-7914',
      source: '0',
      target: '13',
    },
    {
      id: 'edge-8474',
      source: '0',
      target: '14',
    },
    {
      id: 'edge-5896',
      source: '0',
      target: '15',
    },
    {
      id: 'edge-8393',
      source: '0',
      target: '16',
    },
    {
      id: 'edge-4763',
      source: '2',
      target: '3',
    },
    {
      id: 'edge-6744',
      source: '4',
      target: '5',
    },
    {
      id: 'edge-3854',
      source: '4',
      target: '6',
    },
    {
      id: 'edge-3895',
      source: '5',
      target: '6',
    },
    {
      id: 'edge-6403',
      source: '7',
      target: '13',
    },
    {
      id: 'edge-520',
      source: '8',
      target: '14',
    },
    {
      id: 'edge-5388',
      source: '9',
      target: '10',
    },
    {
      id: 'edge-9095',
      source: '10',
      target: '22',
    },
    {
      id: 'edge-3177',
      source: '10',
      target: '14',
    },
    {
      id: 'edge-839',
      source: '10',
      target: '12',
    },
    {
      id: 'edge-1712',
      source: '10',
      target: '24',
    },
    {
      id: 'edge-9622',
      source: '10',
      target: '21',
    },
    {
      id: 'edge-6745',
      source: '10',
      target: '20',
    },
    {
      id: 'edge-2467',
      source: '11',
      target: '24',
    },
    {
      id: 'edge-2550',
      source: '11',
      target: '22',
    },
    {
      id: 'edge-9144',
      source: '11',
      target: '14',
    },
    {
      id: 'edge-7801',
      source: '12',
      target: '13',
    },
    {
      id: 'edge-8572',
      source: '16',
      target: '17',
    },
    {
      id: 'edge-4541',
      source: '16',
      target: '18',
    },
    {
      id: 'edge-6974',
      source: '16',
      target: '21',
    },
    {
      id: 'edge-1867',
      source: '16',
      target: '22',
    },
    {
      id: 'edge-8900',
      source: '17',
      target: '18',
    },
    {
      id: 'edge-536',
      source: '17',
      target: '20',
    },
    {
      id: 'edge-9284',
      source: '18',
      target: '19',
    },
    {
      id: 'edge-6909',
      source: '19',
      target: '20',
    },
    {
      id: 'edge-882',
      source: '19',
      target: '33',
    },
    {
      id: 'edge-3134',
      source: '19',
      target: '22',
    },
    {
      id: 'edge-8297',
      source: '19',
      target: '23',
    },
    {
      id: 'edge-1539',
      source: '20',
      target: '21',
    },
    {
      id: 'edge-8813',
      source: '21',
      target: '22',
    },
    {
      id: 'edge-3600',
      source: '22',
      target: '24',
    },
    {
      id: 'edge-6282',
      source: '22',
      target: '25',
    },
    {
      id: 'edge-5281',
      source: '22',
      target: '26',
    },
    {
      id: 'edge-2821',
      source: '22',
      target: '23',
    },
    {
      id: 'edge-4346',
      source: '22',
      target: '28',
    },
    {
      id: 'edge-9766',
      source: '22',
      target: '30',
    },
    {
      id: 'edge-2254',
      source: '22',
      target: '31',
    },
    {
      id: 'edge-3830',
      source: '22',
      target: '32',
    },
    {
      id: 'edge-9313',
      source: '22',
      target: '33',
    },
    {
      id: 'edge-4793',
      source: '23',
      target: '28',
    },
    {
      id: 'edge-5806',
      source: '23',
      target: '27',
    },
    {
      id: 'edge-3992',
      source: '23',
      target: '29',
    },
    {
      id: 'edge-8927',
      source: '23',
      target: '30',
    },
    {
      id: 'edge-8878',
      source: '23',
      target: '31',
    },
    {
      id: 'edge-7242',
      source: '23',
      target: '33',
    },
    {
      id: 'edge-9725',
      source: '32',
      target: '33',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new CustomGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
  },
  edge: {
    keyShape: {
      endArrow: true,
    },
  },
  layout: {
    type: 'gForce-gpu',
    maxIteration: 1000,
    linkDistance: (e) => {
      if (e.source === '0') return 100;
      return 1;
    },
  },
  autoFit: 'view',
  data,
});

window.graph = graph;