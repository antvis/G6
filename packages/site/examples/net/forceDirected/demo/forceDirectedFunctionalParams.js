import { Graph } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new Graph({
  container: 'container',
  width,
  height,
  transforms: [
    {
      type: 'transform-v4-data',
      activeLifecycle: ['read'],
    },
  ],
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
    default: ['zoom-canvas', 'drag-canvas', 'click-select', 'drag-node'],
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

window.graph = graph;
