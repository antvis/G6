import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  edges: {
    'loop-edge': Extensions.LoopEdge,
  },
  layouts: {
    'dagre-layout': Extensions.DagreLayout,
  },
});

const graph = new ExtGraph({
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
          x: 250,
          y: 250,
        },
      },
    ],
    edges: [
      {
        id: 'line-default',
        source: 'node1',
        target: 'node1',
        data: {
          keyShape: {
            loopCfg: {
              position: 'top',
            },
          },
        },
      },
      {
        id: 'line-active',
        source: 'node1',
        target: 'node1',
        data: {
          keyShape: {
            loopCfg: {
              position: 'top-right',
            },
          },
        },
      },
      {
        id: 'line-selected',
        source: 'node1',
        target: 'node1',
        data: {
          keyShape: {
            loopCfg: {
              position: 'right',
            },
          },
        },
      },
      {
        id: 'line-highlight',
        source: 'node1',
        target: 'node1',
        data: {
          keyShape: {
            loopCfg: {
              position: 'bottom-right',
            },
          },
        },
      },
      {
        id: 'line-inactive',
        source: 'node1',
        target: 'node1',
        data: {
          keyShape: {
            loopCfg: {
              position: 'bottom',
            },
          },
        },
      },
    ],
  },
  edge: {
    type: 'loop-edge',
    keyShape: {
      endArrow: true,
    },
    haloShape: {},
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
    labelBackgroundShape: {},
  },
});

graph.on('afterrender', (e) => {
  graph.setItemState('line-active', 'active', true);
  graph.setItemState('line-selected', 'selected', true);
  graph.setItemState('line-highlight', 'highlight', true);
  graph.setItemState('line-inactive', 'inactive', true);
});

window.graph = graph;