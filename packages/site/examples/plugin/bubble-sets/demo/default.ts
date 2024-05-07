import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', size: 50, data: { cluster: 'a' } },
    { id: 'node1', size: 30, data: { cluster: 'b' } },
    { id: 'node2', size: 30, data: { cluster: 'c' } },
    { id: 'node3', size: 30, data: { cluster: 'd' } },
    { id: 'node4', size: 30, data: { cluster: 'a' } },
    { id: 'node5', size: 30, data: { cluster: 'b' } },
    { id: 'node6', size: 15, data: { cluster: 'b' } },
    { id: 'node7', size: 15, data: { cluster: 'b' } },
    { id: 'node8', size: 15, data: { cluster: 'c' } },
    { id: 'node9', size: 15, data: { cluster: 'c' } },
    { id: 'node10', size: 15, data: { cluster: 'c' } },
    { id: 'node11', size: 15, data: { cluster: 'c' } },
    { id: 'node12', size: 15, data: { cluster: 'c' } },
    { id: 'node13', size: 15, data: { cluster: 'c' } },
    { id: 'node14', size: 15, data: { cluster: 'd' } },
    { id: 'node15', size: 15, data: { cluster: 'd' } },
    { id: 'node16', size: 15, data: { cluster: 'd' } },
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
};

const groupedNodesByCluster = data.nodes.reduce((acc, node) => {
  const cluster = node.data.cluster;
  acc[cluster] ||= [];
  acc[cluster].push(node.id);
  return acc;
}, {});

const createStyle = (baseColor) => ({
  fill: baseColor,
  stroke: baseColor,
  labelFill: '#fff',
  labelPadding: 2,
  labelBackgroundFill: baseColor,
  labelBackgroundRadius: 5,
});

const graph = new Graph({
  container: 'container',
  data,
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  node: {
    style: { size: (d) => d.size },
    palette: { field: 'cluster' },
  },
  layout: {
    type: 'force',
    preventOverlap: true,
    animation: true,
    linkDistance: (d) => {
      if (d.source === 'node0' || d.target === 'node0') {
        return 200;
      }
      return 80;
    },
  },
  plugins: [
    {
      key: 'bubble-sets-a',
      type: 'bubble-sets',
      members: groupedNodesByCluster['a'],
      labelText: 'cluster-a',
      ...createStyle('#1783FF'),
    },
    {
      key: 'bubble-sets-b',
      type: 'bubble-sets',
      members: groupedNodesByCluster['b'],
      labelText: 'cluster-b',
      ...createStyle('#00C9C9'),
    },
    {
      key: 'bubble-sets-c',
      type: 'bubble-sets',
      members: groupedNodesByCluster['c'],
      labelText: 'cluster-c',
      ...createStyle('#F08F56'),
    },
    {
      key: 'bubble-sets-d',
      type: 'bubble-sets',
      members: groupedNodesByCluster['d'],
      labelText: 'cluster-d',
      ...createStyle('#D580FF'),
    },
  ],
  autoFit: 'center',
});

graph.render();
