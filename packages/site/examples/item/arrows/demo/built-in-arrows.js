import { Graph } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new Graph({
  container,
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
          x: 80,
          y: 100,
        },
      },
      {
        id: 'node2',
        data: { x: 250, y: 100 },
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
        data: { x: 250, y: 150 },
      },
      {
        id: 'node5',
        data: {
          x: 80,
          y: 200,
        },
      },
      {
        id: 'node6',
        data: { x: 250, y: 200 },
      },
      {
        id: 'node7',
        data: {
          x: 80,
          y: 250,
        },
      },
      {
        id: 'node8',
        data: { x: 250, y: 250 },
      },
      {
        id: 'node9',
        data: {
          x: 80,
          y: 300,
        },
      },
      {
        id: 'node10',
        data: { x: 250, y: 300 },
      },
      {
        id: 'node11',
        data: {
          x: 80,
          y: 350,
        },
      },
      {
        id: 'node12',
        data: { x: 250, y: 350 },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {
          keyShape: {
            endArrow: true,
          },
          labelShape: {
            text: 'simple-arrow',
          },
        },
      },
      {
        id: 'edge2',
        source: 'node3',
        target: 'node4',
        data: {
          keyShape: {
            endArrow: {
              type: 'vee',
            },
          },
          labelShape: {
            text: 'vee-arrow',
          },
        },
      },
      {
        id: 'edge3',
        source: 'node5',
        target: 'node6',
        data: {
          keyShape: {
            endArrow: {
              type: 'circle',
            },
          },
          labelShape: {
            text: 'circle-arrow',
          },
        },
      },
      {
        id: 'edge4',
        source: 'node7',
        target: 'node8',
        data: {
          keyShape: {
            endArrow: {
              type: 'rect',
            },
          },
          labelShape: {
            text: 'rect-arrow',
          },
        },
      },
      {
        id: 'edge5',
        source: 'node9',
        target: 'node10',
        data: {
          keyShape: {
            endArrow: {
              type: 'diamond',
            },
          },
          labelShape: {
            text: 'diamond-arrow',
          },
        },
      },
      {
        id: 'edge6',
        source: 'node11',
        target: 'node12',
        data: {
          keyShape: {
            endArrow: {
              type: 'triangle-rect',
            },
          },
          labelShape: {
            text: 'triangle-arrow',
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
