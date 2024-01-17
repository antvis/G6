import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  edges: {
    'quadratic-edge': Extensions.QuadraticEdge,
  },
  layouts: {
    'radial-layout': Extensions.RadialLayout,
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
  layout: {
    type: 'radial-layout',
    focusNode: 'node1',
    unitRadius: 250,
    linkDistance: 250,
  },
  data: {
    nodes: [
      {
        id: 'node1',
        data: {},
      },
      {
        id: 'node2',
        data: {},
      },
      {
        id: 'node3',
        data: {},
      },
      {
        id: 'node4',
        data: {},
      },
      {
        id: 'node5',
        data: {},
      },
      {
        id: 'node6',
        data: {},
      },
    ],
    edges: [
      {
        id: 'line-default',
        source: 'node1',
        target: 'node2',
      },
      {
        id: 'line-active',
        source: 'node1',
        target: 'node3',
      },
      {
        id: 'line-selected',
        source: 'node1',
        target: 'node4',
      },
      {
        id: 'line-highlight',
        source: 'node1',
        target: 'node5',
      },
      {
        id: 'line-inactive',
        source: 'node1',
        target: 'node6',
      },
    ],
  },
  edge: {
    type: 'quadratic-edge',
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