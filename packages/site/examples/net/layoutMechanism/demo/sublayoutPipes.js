import G6 from '@antv/g6';

const data = {
  nodes: [
    { id: '0', label: '0' },
    { id: '1', label: '1' },
    { id: '2', label: '2' },
    { id: '3', label: '3' },
    { id: '4', label: '4' },
    { id: '5', label: '5' },
    { id: '6', label: '6' },
    { id: '7', label: '7' },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '1', target: '2' },
    { source: '2', target: '3' },
    { source: '3', target: '4' },
    { source: '5', target: '6' },
    { source: '6', target: '7' },
  ],
};
const nodes = data.nodes;

nodes.forEach(function (node, i) {
  if (i <= 4) {
    if (!node.style) {
      node.style = {
        fill: '#F6C3B7',
        stroke: '#E8684A',
      };
    } else {
      node.style.fill = 'lightsteelblue';
    }
  }
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitView: true,
  fitViewPadding: 40,
  modes: {
    default: ['drag-node'],
  },
  defaultNode: {
    size: 20,
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
  },
  // the graph is separated into two parts (red and blue), and they are applied with different layout method
  // 图被划分为两部分（红色和蓝色），不同部分使用了不同的布局
  layout: {
    pipes: [
      {
        type: 'circular',
        nodesFilter: (node) => (+node.id) <= 4
      },
      {
        type: 'grid',
        begin: [100, 0],
        nodesFilter: (node) => (+node.id) > 4
      }
    ],
  },
});
graph.data(data);
graph.render();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 20);
  };
