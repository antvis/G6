import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
    },
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
    },
    {
      id: '5',
    },
    {
      id: '6',
    },
    {
      id: '7',
    },
    {
      id: '8',
    },
    {
      id: '9',
    },
  ],
  edges: [
    {
      id: 'edge-395',
      source: '0',
      target: '1',
      data: {},
    },
    {
      id: 'edge-973',
      source: '0',
      target: '2',
      data: {},
    },
    {
      id: 'edge-80',
      source: '1',
      target: '4',
      data: {},
    },
    {
      id: 'edge-125',
      source: '0',
      target: '3',
      data: {},
    },
    {
      id: 'edge-44',
      source: '3',
      target: '4',
      data: {},
    },
    {
      id: 'edge-700',
      source: '4',
      target: '5',
      data: {},
    },
    {
      id: 'edge-475',
      source: '4',
      target: '6',
      data: {},
    },
    {
      id: 'edge-990',
      source: '5',
      target: '7',
      data: {},
    },
    {
      id: 'edge-770',
      source: '5',
      target: '8',
      data: {},
    },
    {
      id: 'edge-228',
      source: '8',
      target: '9',
      data: {},
    },
    {
      id: 'edge-563',
      source: '2',
      target: '9',
      data: {},
    },
    {
      id: 'edge-893',
      source: '3',
      target: '9',
      data: {},
    },
  ],
};

const layoutConfigs = {
  Default: {
    type: 'dagre',
    nodesep: 100,
    ranksep: 70,
    controlPoints: true,
  },
  // TODO: 换个数据
  LR: {
    type: 'dagre',
    rankdir: 'LR',
    align: 'DL',
    nodesep: 50,
    ranksep: 70,
    controlPoints: true,
  },
  'LR&UL': {
    type: 'dagre',
    rankdir: 'LR',
    align: 'UL',
    controlPoints: true,
    nodesep: 50,
    ranksep: 70,
  },
};

const container = document.getElementById('container');

const graph = new Graph({
  container: 'container',
  data,
  layout: layoutConfigs.Default,
  node: {
    style: {
      type: 'rect',
      size: [60, 30],
      radius: 8,
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
  },
  edge: {
    style: {
      type: 'polyline',
      endArrow: true,
      lineWidth: 2,
      stroke: '#C2C8D5',
    },
  },
  autoFit: 'view',
  behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
});

graph.render();

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
btnContainer.style.zIndex = '10';
container.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML = '👉 Change configs:';
btnContainer.appendChild(tip);

Object.keys(layoutConfigs).forEach((name, i) => {
  const btn = document.createElement('a');
  btn.innerHTML = name;
  btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  btn.style.padding = '4px';
  btn.style.marginLeft = i > 0 ? '24px' : '8px';
  btnContainer.appendChild(btn);
  btn.addEventListener('click', () => {
    graph.setLayout(layoutConfigs[name]);
    graph.layout();
  });
});
