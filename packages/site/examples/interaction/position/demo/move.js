import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 150,
        y: 50,
        label: 'node1',
      },
    },
    {
      id: 'node2',
      data: {
        x: 200,
        y: 150,
        label: 'node2',
      },
    },
    {
      id: 'node3',
      data: {
        x: 100,
        y: 150,
        label: 'node3',
      },
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
      source: 'node2',
      target: 'node3',
    },
    {
      id: 'edge3',
      source: 'node3',
      target: 'node1',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  plugins: [
    {
      // lod-controller will be automatically assigned to graph with `disableLod: false` to graph if it is not configured as following
      type: 'lod-controller',
      disableLod: true,
    },
  ],
  data,
  node: {
    labelShape: {
      position: 'center',
      text: {
        fields: ['label'],
        formatter: (model) => model.data.label,
      },
    },
  },
  edge: {
    keyShape: {
      stroke: '#b5b5b5',
    },
  },
});

// 节点上的点击事件
graph.on('node:click', (event) => {
  const { itemId } = event;
  graph.focusItem(itemId);
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
