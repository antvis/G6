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
  data: {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 80,
          y: 100,
        },
      },
      {
        id: 'node2',
        data: { x: 300, y: 100 },
      },
      {
        id: 'node3',
        data: {
          x: 80,
          y: 150,
        },
      },
      {
        id: 'node4',
        data: { x: 300, y: 150 },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {
          keyShape: {
            fill: '#F6BD16',
            stroke: '#F6BD16',
            endArrow: {
              path: 'M0,0 L10,4 L14,14 L18,4 L28,0 L18,-4 L14,-14 L10,-4 Z',
              fill: '#F6BD16',
              stroke: '#F6BD16',
            },
          },
          labelShape: {
            text: 'custom arrow 1',
          },
        },
      },
      {
        id: 'edge2',
        source: 'node3',
        target: 'node4',
        data: {
          keyShape: {
            fill: '#F6BD16',
            stroke: '#F6BD16',
            endArrow: {
              path: 'M 3,-5 L 3,5 L 15,10 L 15,-10 Z',
              fill: '#F6BD16',
              stroke: '#F6BD16',
            },
          },
          labelShape: {
            text: 'custom arrow 2',
          },
        },
      },
    ],
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
