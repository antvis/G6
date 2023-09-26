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

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 30]);
  };
