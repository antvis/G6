import { Graph, extend, Extensions } from '@antv/g6';

const ExtGraph = extend(Graph, {
  behaviors: {
    'scroll-canvas': Extensions.ScrollCanvas,
  },
});

const container = document.getElementById('container');

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'grid',
    cols: 1,
    height: 3000,
    begin: [0, 0],
  },
  plugins: [
    {
      // lod-controller will be automatically assigned to graph with `disableLod: false` to graph if it is not configured as following
      type: 'lod-controller',
      disableLod: true,
    },
  ],
  node: {
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
  },
  data: {
    nodes: [
      { id: 'node1', data: {} },
      { id: 'node2', data: {} },
      { id: 'node3', data: {} },
      { id: 'node4', data: {} },
      { id: 'node5', data: {} },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {},
      },
      { id: 'edge2', source: 'node1', target: 'node2', data: {} },
      { id: 'edge3', source: 'node2', target: 'node3', data: {} },
      { id: 'edge4', source: 'node3', target: 'node4', data: {} },
      { id: 'edge5', source: 'node4', target: 'node5', data: {} },
    ],
  },
  modes: {
    default: [
      {
        type: 'scroll-canvas',
        direction: 'y',
      },
    ],
  },
});

window.graph = graph;
