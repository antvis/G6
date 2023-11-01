import { Graph } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
  },
  plugins: [
    {
      // lod-controller will be automatically assigned to graph with `disableLod: false` to graph if it is not configured as following
      type: 'lod-controller',
      disableLod: true,
    },
  ],
  data: {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 150,
          y: 100,
        },
      },
      {
        id: 'node2',
        data: { x: 250, y: 200 },
      },
      {
        id: 'node3',
        data: { x: 450, y: 200 },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
      },
      {
        id: 'edge2',
        source: 'node1',
        target: 'node3',
      },
      {
        id: 'edge3',
        source: 'node2',
        target: 'node3',
      },
    ],
  },
  edge: {
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
      position: 'bottom',
    },
    labelBackgroundShape: {
      fill: 'linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
    },
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
