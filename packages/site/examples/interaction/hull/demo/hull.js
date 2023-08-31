import G6, { Extensions } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', data: { size: 50 } },
    { id: 'node1', data: { size: 30 } },
    { id: 'node2', data: { size: 30 } },
    { id: 'node3', data: { size: 30 } },
    { id: 'node4', data: { size: 30, isLeaf: true } },
    { id: 'node5', data: { size: 30, isLeaf: true } },
    { id: 'node6', data: { size: 15, isLeaf: true } },
    { id: 'node7', data: { size: 15, isLeaf: true } },
    { id: 'node8', data: { size: 15, isLeaf: true } },
    { id: 'node9', data: { size: 15, isLeaf: true } },
    { id: 'node10', data: { size: 15, isLeaf: true } },
    { id: 'node11', data: { size: 15, isLeaf: true } },
    { id: 'node12', data: { size: 15, isLeaf: true } },
    { id: 'node13', data: { size: 15, isLeaf: true } },
    { id: 'node14', data: { size: 15, isLeaf: true } },
    { id: 'node15', data: { size: 15, isLeaf: true } },
    { id: 'node16', data: { size: 15, isLeaf: true } },
  ],
  edges: [
    { id: 'edge1', source: 'node0', target: 'node1' },
    { id: 'edge2', source: 'node0', target: 'node2' },
    { id: 'edge3', source: 'node0', target: 'node3' },
    { id: 'edge4', source: 'node0', target: 'node4' },
    { id: 'edge5', source: 'node0', target: 'node5' },
    { id: 'edge6', source: 'node1', target: 'node6' },
    { id: 'edge7', source: 'node1', target: 'node7' },
    { id: 'edge8', source: 'node2', target: 'node8' },
    { id: 'edge9', source: 'node2', target: 'node9' },
    { id: 'edge10', source: 'node2', target: 'node10' },
    { id: 'edge11', source: 'node2', target: 'node11' },
    { id: 'edge12', source: 'node2', target: 'node12' },
    { id: 'edge13', source: 'node2', target: 'node13' },
    { id: 'edge14', source: 'node3', target: 'node14' },
    { id: 'edge15', source: 'node3', target: 'node15' },
    { id: 'edge16', source: 'node3', target: 'node16' },
  ],
};
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Wait for the layout to complete...';
const container = document.getElementById('container');
container.appendChild(descriptionDiv);

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;

const hullPlugin = new Extensions.Hull({
  key: 'hull-plugin1',
});

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  plugins: [hullPlugin],
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'lasso-select'],
  },
  layout: {
    type: 'force',
    preventOverlap: true,
    workerEnabled: true,
    linkDistance: (d) => {
      if (d.source === 'node0') {
        return 300;
      }
      return 60;
    },
    nodeStrength: (d) => {
      if (d.data.isLeaf) {
        return -50;
      }
      return -10;
    },
    edgeStrength: (d) => {
      if (d.source === 'node1' || d.source === 'node2' || d.source === 'node3') {
        return 0.7;
      }
      return 0.1;
    },
  },
  data,
  node: {
    keyShape: {
      r: {
        fields: ['size'],
        formatter: (model) => model.data.size,
      },
    },
  },
});

let centerNodes = graph
  .getAllNodesData()
  .filter((model) => !model.data.isLeaf)
  .map((node) => node.id);

graph.on('afterlayout', () => {
  descriptionDiv.innerHTML = '';
  hullPlugin.addHull({
    id: 'centerNode-hull',
    members: centerNodes,
    labelShape: {
      text: 'centerNode-hull',
      position: 'left',
      offsetY: -2,
    },
  });

  hullPlugin.addHull({
    id: 'leafNode-hull1',
    members: ['node6', 'node7'],
    style: {
      fill: 'lightgreen',
      stroke: 'green',
    },
  });

  hullPlugin.addHull({
    id: 'leafNode-hull2',
    members: ['node8', 'node9', 'node10', 'node11', 'node12', 'node13'],
    style: {
      fill: 'lightgreen',
      stroke: 'green',
    },
  });
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
