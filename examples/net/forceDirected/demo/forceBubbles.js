import G6 from '@antv/g6';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const colors = [
  '#BDD2FD',
  '#BDEFDB',
  '#C2C8D5',
  '#FBE5A2',
  '#F6C3B7',
  '#B6E3F5',
  '#D3C6EA',
  '#FFD8B8',
  '#AAD8D8',
  '#FFD6E7',
];
const strokes = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
];

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

const width = document.getElementById('container').scrollWidth;
const height = (document.getElementById('container').scrollHeight || 500) - 20;

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'force',
    nodeStrength: 30,
    collideStrength: 0.7,
    alphaDecay: 0.01,
    preventOverlap: true,
  },
  modes: {
    default: ['drag-node'],
  },
  defaultNode: {
    size: [10, 10],
  },
});

// mapping
const nodes = data.nodes;
const nodeMap = new Map();
const clusterMap = new Map();
let clusterId = 0;
nodes.forEach((node) => {
  nodeMap.set(node.id, node);
  // cluster
  if (node.cluster && clusterMap.get(node.cluster) === undefined) {
    clusterMap.set(node.cluster, clusterId);
    clusterId++;
  }
  const cid = clusterMap.get(node.cluster);
  if (!node.style) node.style = {};
  node.style.fill = colors[cid % colors.length];
  node.style.stroke = strokes[cid % strokes.length];
});

// map the value to node size
let maxNodeValue = -9999,
  minNodeValue = 9999;
nodes.forEach(function (n) {
  if (maxNodeValue < n.value) maxNodeValue = n.value;
  if (minNodeValue > n.value) minNodeValue = n.value;
});
const nodeSizeRange = [10, 30];
const nodeSizeDataRange = [minNodeValue, maxNodeValue];
scaleNodeProp(nodes, 'size', 'value', nodeSizeDataRange, nodeSizeRange);

nodes.forEach(function (node) {
  node.oriSize = node.size;
  node.oriLabel = node.label;
});

function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}
graph.on('node:dragstart', function (e) {
  graph.layout();
  refreshDragedNodePosition(e);
});
graph.on('node:drag', function (e) {
  refreshDragedNodePosition(e);
});
graph.on('node:dragend', function (e) {
  e.item.get('model').fx = null;
  e.item.get('model').fy = null;
});
graph.on('node:click', function (e) {
  const node = e.item;
  const states = node.getStates();
  let clicked = false;
  const model = node.getModel();
  let size = 200;
  let labelText = 'NODE: ' + model.id + '\n' + model.description;
  states.forEach(function (state) {
    if (state === 'click') {
      clicked = true;
      size = model.oriSize;
      labelText = model.oriLabel;
    }
  });
  graph.setItemState(node, 'click', !clicked);
  graph.updateItem(node, {
    size,
    label: labelText,
  });
  graph.layout();
});

graph.data(data);
graph.render();

function scaleNodeProp(elements, propName, refPropName, dataRange, outRange) {
  const outLength = outRange[1] - outRange[0];
  const dataLength = dataRange[1] - dataRange[0];
  elements.forEach(function (n) {
    if (propName.split('.')[0] === 'style') {
      if (n.style) {
        n.style[propName.split('.')[1]] =
          ((n[refPropName] - dataRange[0]) * outLength) / dataLength + outRange[0];
      } else {
        n.style = _defineProperty(
          {},
          propName.split('.')[1],
          ((n[refPropName] - dataRange[0]) * outLength) / dataLength + outRange[0],
        );
      }
    } else {
      n[propName] = ((n[refPropName] - dataRange[0]) * outLength) / dataLength + outRange[0];
    }
  });
}
