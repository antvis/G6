import { Graph, extend, Extensions } from '@antv/g6';

const ExtGraph = extend(Graph, {
  behaviors: {
    'create-edge': Extensions.CreateEdge,
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
      { id: 'edge2', source: 'node1', target: 'node3', data: {} },
      { id: 'edge3', source: 'node1', target: 'node4', data: {} },
      { id: 'edge4', source: 'node2', target: 'node3', data: {} },
      { id: 'edge5', source: 'node3', target: 'node4', data: {} },
      { id: 'edge6', source: 'node4', target: 'node5', data: {} },
    ],
  },
  modes: {
    default: [
      {
        key: 'create-edge-behavior-key',
        type: 'create-edge',
        trigger: 'click',
        edgeConfig: { keyShape: { lineDash: [5, 5] } },
        createVirtualEventName: 'begincreate',
        createActualEventName: 'aftercreate',
        cancelCreateEventName: 'cancelcreate',
      },
    ],
  },
});

graph.on('begincreate', (e) => {
  console.log('bgin');
  graph.setCursor('crosshair');
});
graph.on('aftercreate', (e) => {
  const { edge } = e;
  console.log('finish', edge.id, graph.getEdgeData(edge.id));
  graph.updateData('edge', {
    id: edge.id,
    data: {
      keyShape: {
        lineDash: ['100%', 0],
      },
    },
  });
});
graph.on('cancelcreate', (e) => {
  graph.setCursor('default');
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 30]);
  };
