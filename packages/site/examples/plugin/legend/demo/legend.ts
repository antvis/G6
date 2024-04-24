import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '1',
      style: {
        type: 'circle',
        fill: '#5B8FF9',
      },
      data: { cluster: 'node-type1' },
    },
    {
      id: '2',
      style: {
        type: 'rect',
        fill: '#5AD8A6',
      },
      data: { cluster: 'node-type2' },
    },
    {
      id: '3',
      style: {
        type: 'triangle',
        fill: '#5D7092',
      },
      data: { cluster: 'node-type3' },
    },
    {
      id: '4',
      style: {
        type: 'diamond',
        fill: '#6F5EF9',
      },
      data: { cluster: 'node-type4' },
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      data: { cluster: 'edge-type1' },
    },
    {
      source: '1',
      target: '4',
      data: { cluster: 'edge-type2' },
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '2',
      target: '4',
      data: { cluster: 'edge-type3' },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelPosition: 'bottom',
      stroke: '#fff',
      lineWidth: 4,
    },
  },
  edge: {
    style: {
      stroke: '#fff',
      lineWidth: 4,
    },
  },
  layout: {
    type: 'force',
  },
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
    },
  ],
});

graph.render();
