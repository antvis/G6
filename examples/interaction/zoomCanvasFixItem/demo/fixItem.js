import G6 from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', size: 50, label: '0', x: 326, y: 268 },
    { id: 'node1', size: 30, label: '1', x: 280, y: 384 },
    { id: 'node2', size: 30, label: '2', x: 234, y: 167 },
    { id: 'node3', size: 30, label: '3', x: 391, y: 368 },
    { id: 'node4', size: 30, label: '4', x: 444, y: 209 },
    { id: 'node5', size: 30, label: '5', x: 378, y: 157 },
    { id: 'node6', size: 15, label: '6', x: 229, y: 400 },
    { id: 'node7', size: 15, label: '7', x: 281, y: 440 },
    { id: 'node8', size: 15, label: '8', x: 188, y: 119 },
    { id: 'node9', size: 15, label: '9', x: 287, y: 157 },
    { id: 'node10', size: 15, label: '10', x: 185, y: 200 },
    { id: 'node11', size: 15, label: '11', x: 238, y: 110 },
    { id: 'node12', size: 15, label: '12', x: 239, y: 221 },
    { id: 'node13', size: 15, label: '13', x: 176, y: 160 },
    { id: 'node14', size: 15, label: '14', x: 389, y: 423 },
    { id: 'node15', size: 15, label: '15', x: 441, y: 341 },
    { id: 'node16', size: 15, label: '16', x: 442, y: 398 },
  ],
  edges: [
    { source: 'node0', target: 'node1', label: '0-1' },
    { source: 'node0', target: 'node2', label: '0-2' },
    { source: 'node0', target: 'node3', label: '0-3' },
    { source: 'node0', target: 'node4', label: '0-4' },
    { source: 'node0', target: 'node5', label: '0-5' },
    { source: 'node1', target: 'node6', label: '1-6' },
    { source: 'node1', target: 'node7', label: '1-7' },
    { source: 'node2', target: 'node8', label: '2-8' },
    { source: 'node2', target: 'node9', label: '2-9' },
    { source: 'node2', target: 'node10', label: '2-10' },
    { source: 'node2', target: 'node11', label: '2-11' },
    { source: 'node2', target: 'node12', label: '2-12' },
    { source: 'node2', target: 'node13', label: '2-13' },
    { source: 'node3', target: 'node14', label: '3-14' },
    { source: 'node3', target: 'node15', label: '3-15' },
    { source: 'node3', target: 'node16', label: '3-16' },
  ],
};

const graphContainer = document.getElementById('container');

// Add a selector to DOM
const selector = document.createElement('select');
selector.id = 'selector';
const selection1 = document.createElement('option');
selection1.value = 'fixAll';
selection1.innerHTML = 'Fix all';
const selection2 = document.createElement('option');
selection2.value = 'fixLabel';
selection2.innerHTML = 'Fix fontSize of label';
const selection3 = document.createElement('option');
selection3.value = 'fixLineWidth';
selection3.innerHTML = 'Fix lineWidth of keyShape';
selector.appendChild(selection1);
selector.appendChild(selection2);
selector.appendChild(selection3);
graphContainer.appendChild(selector);

let fixSelectedItems = {
  fixAll: true,
  fixState: 'yourStateName', // 'selected' by default
};

const width = graphContainer.scrollWidth;
const height = (graphContainer.scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: [
      'drag-canvas',
      'drag-node',
      {
        type: 'zoom-canvas',
        fixSelectedItems,
      },
    ],
  },
  defaultNode: {
    size: [10, 10],
    style: {
      lineWidth: 2,
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    size: 1,
    style: {
      stroke: '#e2e2e2',
      lineAppendWidth: 2,
    },
  },
  nodeStateStyles: {
    yourStateName: {
      stroke: '#f00',
      lineWidth: 3,
    },
  },
  edgeStateStyles: {
    yourStateName: {
      stroke: '#f00',
      lineWidth: 3,
    },
  },
});

graph.on('node:click', (e) => {
  graph.setItemState(e.item, 'yourStateName', true);
});
graph.on('edge:click', (e) => {
  graph.setItemState(e.item, 'yourStateName', true);
});

graph.on('canvas:click', (e) => {
  graph.findAllByState('node', 'yourStateName').forEach((node) => {
    graph.setItemState(node, 'yourStateName', false);
  });
  graph.findAllByState('edge', 'yourStateName').forEach((edge) => {
    graph.setItemState(edge, 'yourStateName', false);
  });
});

graph.data(data);
graph.render();

// Listen to the selector, change the mode when the selector is changed
selector.addEventListener('change', (e) => {
  const value = e.target.value;
  Object.keys(fixSelectedItems).forEach((key) => {
    if (key !== 'fixState') fixSelectedItems[key] = false;
  });
  fixSelectedItems[value] = true;
});
