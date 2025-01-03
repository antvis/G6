import { Graph, NodeEvent } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
      value: 10,
      cluster: 'a',
      description: 'this is node 0, \nand the value of it is 10',
    },
    {
      id: '1',
      label: '1',
      value: 20,
      cluster: 'b',
      description: 'this is node 1, \nand the value of it is 20',
    },
    {
      id: '2',
      label: '2',
      value: 5,
      cluster: 'a',
      description: 'this is node 2, \nand the value of it is 5',
    },
    {
      id: '3',
      label: '3',
      value: 10,
      cluster: 'a',
      description: 'this is node 3, \nand the value of it is 10',
    },
    {
      id: '4',
      label: '4',
      value: 12,
      cluster: 'c',
      subCluster: 'sb',
      description: 'this is node 4, \nand the value of it is 12',
    },
    {
      id: '5',
      label: '5',
      value: 18,
      cluster: 'c',
      subCluster: 'sa',
      description: 'this is node 5, \nand the value of it is 18',
    },
    {
      id: '6',
      label: '6',
      value: 3,
      cluster: 'c',
      subCluster: 'sa',
      description: 'this is node 6, \nand the value of it is 3',
    },
    {
      id: '7',
      label: '7',
      value: 7,
      cluster: 'b',
      subCluster: 'sa',
      description: 'this is node 7, \nand the value of it is 7',
    },
    {
      id: '8',
      label: '8',
      value: 21,
      cluster: 'd',
      subCluster: 'sb',
      description: 'this is node 8, \nand the value of it is 21',
    },
    {
      id: '9',
      label: '9',
      value: 9,
      cluster: 'd',
      subCluster: 'sb',
      description: 'this is node 9, \nand the value of it is 9',
    },
  ],
  edges: [],
};

const oriSize = {};

const nodes = data.nodes;
// randomize the node size
nodes.forEach((node) => {
  node.size = Math.random() * 30 + 16;
  oriSize[node.id] = node.size;
});

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      size: (d) => d.size,
      labelText: (d) => (d.size === 200 ? d.description : d.id),
      labelPlacement: 'middle',
      labelFill: '#fff',
    },
    palette: {
      field: (d) => d.cluster,
    },
  },
  layout: {
    type: 'd3-force',
    collide: {
      radius: (d) => d.size / 2,
      strength: 0.7,
    },
    manyBody: {
      strength: 30,
    },
  },
  behaviors: ['drag-element-force'],
});

graph.on(NodeEvent.CLICK, async (e) => {
  const nodeId = e.target.id;
  const data = graph.getNodeData(nodeId);
  const size = data.size === oriSize[nodeId] ? 200 : oriSize[nodeId];
  graph.updateNodeData([{ id: nodeId, size }]);
  await graph.layout();
});

graph.render();
