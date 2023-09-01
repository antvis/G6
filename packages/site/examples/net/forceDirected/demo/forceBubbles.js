import G6 from '@antv/g6';

// TODO: skip this demo

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

const tipDiv = document.createElement('div');
tipDiv.innerHTML = 'Try to click or drag a bubble!';
const graphDiv = document.getElementById('container');
graphDiv.appendChild(tipDiv);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  transforms: [
    'transform-v4-data',
    {
      type: 'map-node-size',
      field: 'value',
    },
  ],
  theme: {
    type: 'spec',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  layout: {
    type: 'force',
    nodeStrength: 10,
    preventOverlap: true,
    animated: true,
    nodeSize: (node) => (node.data.keyShape.r || 16) * 2,
  },
  modes: {
    default: ['drag-node'],
  },
  node: {
    labelShape: {
      position: 'center',
    },
  },
  data,
});

graph.on('node:dragstart', function (e) {
  graph.stopLayout();
});
graph.on('node:dragend', function (e) {
  graph.layout();
});
graph.on('node:click', function (e) {
  const currentR = graph.getNodeData(e.itemId).data.keyShape?.r;
  const originR = graph.getNodeData(e.itemId).data?.originR || currentR;
  graph.updateData('node', {
    id: e.itemId,
    data: {
      keyShape: {
        r: currentR === 100 ? originR : 100,
      },
      originR,
    },
  });
  // TODO: did not envoke
  graph.layout({ type: 'force' });
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 20]);
  };
