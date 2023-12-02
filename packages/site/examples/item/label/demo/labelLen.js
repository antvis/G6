import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 100,
        y: 150,
        label: 'This label is too long to be displayed',
        size: 50,
      },
    },
    {
      id: 'node2',
      data: {
        x: 400,
        y: 150,
        label: 'This label is too long to be displayed',
        size: 100,
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      data: {
        label: 'This label is too long to be displayed',
      },
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new Graph({
  container,
  width,
  height,
  modes: {
    default: ['drag-node'],
  },
  node: {
    keyShape: {
      r: {
        fields: ['size'],
        formatter: (model) => model.data.size / 2,
      },
    },
    labelShape: {
      position: 'center',
      text: {
        fields: ['label'],
        formatter: (model) => model.data.label,
      },
      maxWidth: '80%',
    },
    labelBackgroundShape: {},
  },
  edge: {
    labelBackgroundShape: {},
  },
  data,
});

window.graph = graph;