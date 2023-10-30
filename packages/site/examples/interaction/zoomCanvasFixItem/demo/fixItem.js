import { Graph, extend, Extensions } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

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

const fixSelectedItems = {
  fixAll: true,
  fixLineWidth: false,
  fixLabel: false,
  fixState: 'yourStateName', // `selected` by default
};

const ExtGraph = extend(Graph, {
  transforms: {
    'transform-v4-data': Extensions.TransformV4Data,
  },
  behaviors: {
    'zoom-canvas': Extensions.ZoomCanvas,
  },
});

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: [
      {
        type: 'zoom-canvas',
        fixSelectedItems,
      },
      'drag-node',
      'click-select',
      'drag-canvas',
    ],
  },
  node: {
    lodStrategy: {},
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
  },
  edge: {
    lodStrategy: {},
  },
  nodeState: {
    yourStateName: {
      keyShape: {
        stroke: '#f00',
        lineWidth: 3,
      },
    },
  },
  edgeState: {
    yourStateName: {
      keyShape: {
        stroke: '#f00',
        lineWidth: 3,
      },
    },
  },
  data,
  transforms: [
    'transform-v4-data', // 内置的数据处理器，将 v4 的数据格式转换为 v5
  ],
  layout: {
    type: 'force',
    linkDistance: 120,
  },
});

graph.on('node:click', (e) => {
  graph.setItemState(e.itemId, 'yourStateName', true);
});
graph.on('edge:click', (e) => {
  graph.setItemState(e.itemId, 'yourStateName', true);
});

graph.on('canvas:click', (e) => {
  graph.findIdByState('node', 'yourStateName').forEach((node) => {
    graph.setItemState(node, 'yourStateName', false);
  });
  graph.findIdByState('edge', 'yourStateName').forEach((edge) => {
    graph.setItemState(edge, 'yourStateName', false);
  });
});

const fixOptions = [
  {
    key: 'fixAll',
    desc: 'full size',
  },
  {
    key: 'fixLabel',
    desc: 'labelShape and labelBackgroundShape',
  },
  {
    key: 'fixLineWidth',
    desc: 'lineWidth of keyShape',
  },
];

const textDiv = document.createElement('div');
textDiv.innerHTML = `Please select from the following options to control item size while zooming: \n`;
textDiv.style.position = 'absolute';
textDiv.style.zIndex = 10;
container.appendChild(textDiv);

const div = document.createElement('div');
div.style.position = 'absolute';
div.style.zIndex = 10;

const baseTop = 25;
const gap = 22;

const options = document.createElement('div');
fixOptions.forEach((option, index) => {
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.value = option.key;
  cb.style.position = 'absolute';
  cb.style.top = baseTop + index * gap + 4 + 'px';
  cb.checked = index === 0;
  const label = document.createElement('span');
  label.textContent = `${option.key} (${option.desc})`;
  label.style.position = 'absolute';
  label.style.top = baseTop + index * gap + 'px';
  label.style.left = '20px';
  options.appendChild(cb);
  options.appendChild(label);
});
container.appendChild(options);

options.addEventListener('change', (e) => {
  const value = e.target.value;
  const checked = e.target.checked;
  fixSelectedItems[value] = checked;
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
