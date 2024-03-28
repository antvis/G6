import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '1',
      style: {
        type: 'circle',
        color: '#5B8FF9',
      },
      data: { cluster: 'node-type1' },
    },
    {
      id: '2',
      style: {
        type: 'rect',
        color: '#5AD8A6',
      },
      data: { cluster: 'node-type2' },
    },
    {
      id: '3',
      style: {
        type: 'triangle',
        color: '#5D7092',
      },
      data: { cluster: 'node-type3' },
    },
    {
      id: '4',
      style: {
        type: 'diamond',
        color: '#6F5EF9',
      },
      data: { cluster: 'node-type4' },
    },
  ],
  edges: [
    {
      id: '1-2',
      source: '1',
      target: '2',
      style: {
        type: 'quadratic',
        color: '#F6BD16',
      },
      data: { cluster: 'edge-type1' },
    },
    {
      id: '1-4',
      source: '1',
      target: '4',
      data: { cluster: 'edge-type2' },
    },
    {
      id: '3-4',
      source: '3',
      target: '4',
    },
    {
      id: '2-4',
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
      edgeField: 'cluster',
      titleText: 'Legend Title',
      trigger: 'click',
      position: 'top',
      gridCol: 3,
    },
  ],
});

graph.render();
