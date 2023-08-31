import G6 from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  transform: ['transform-v4-data'],
  layout: {
    type: 'force',
    preventOverlap: true,
    animated: true,
    linkDistance: (d) => {
      if (d.source === 'node0' || d.target === 'node0') {
        return 200;
      }
      return 80;
    },
  },
  modes: {
    default: ['drag-canvas'],
  },
  data: {
    nodes: [
      { id: 'node0', size: 50 },
      { id: 'node1', size: 30 },
      { id: 'node2', size: 30 },
      { id: 'node3', size: 30 },
      { id: 'node4', size: 30, isLeaf: true },
      { id: 'node5', size: 30, isLeaf: true },
      { id: 'node6', size: 15, isLeaf: true },
      { id: 'node7', size: 15, isLeaf: true },
      { id: 'node8', size: 15, isLeaf: true },
      { id: 'node9', size: 15, isLeaf: true },
      { id: 'node10', size: 15, isLeaf: true },
      { id: 'node11', size: 15, isLeaf: true },
      { id: 'node12', size: 15, isLeaf: true },
      { id: 'node13', size: 15, isLeaf: true },
      { id: 'node14', size: 15, isLeaf: true },
      { id: 'node15', size: 15, isLeaf: true },
      { id: 'node16', size: 15, isLeaf: true },
    ],
    edges: [
      { source: 'node0', target: 'node1' },
      { source: 'node0', target: 'node2' },
      { source: 'node0', target: 'node3' },
      { source: 'node0', target: 'node4' },
      { source: 'node0', target: 'node5' },
      { source: 'node1', target: 'node6' },
      { source: 'node1', target: 'node7' },
      { source: 'node2', target: 'node8' },
      { source: 'node2', target: 'node9' },
      { source: 'node2', target: 'node10' },
      { source: 'node2', target: 'node11' },
      { source: 'node2', target: 'node12' },
      { source: 'node2', target: 'node13' },
      { source: 'node3', target: 'node14' },
      { source: 'node3', target: 'node15' },
      { source: 'node3', target: 'node16' },
    ],
  },
});

graph.on('node:dragstart', function (e) {
  graph.stopLayout();
});
graph.on('node:drag', function (e) {
  refreshDragedNodePosition(e);
});
graph.on('node:dragend', (e) => {
  graph.layout();
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };

function refreshDragedNodePosition(e) {
  graph.updateData('node', {
    id: e.itemId,
    data: {
      fx: e.canvas.x,
      fy: e.canvas.y,
      x: e.canvas.x,
      y: e.canvas.y,
    },
  });
}
