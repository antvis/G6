import { Graph, Extensions, extend } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '1',
      data: {
        label: '公司1',
        group: 1,
      },
    },
    {
      id: '2',
      data: {
        label: '公司2',
        group: 1,
      },
    },
    {
      id: '3',
      data: {
        label: '公司3',
        group: 1,
      },
    },
    {
      id: '4',
      data: {
        label: '公司4',
      },
    },
    {
      id: '5',
      data: {
        label: '公司5',
        group: 1,
      },
    },
    {
      id: '6',
      data: {
        label: '公司6',
        group: 2,
      },
    },
    {
      id: '7',
      data: {
        label: '公司7',
        group: 2,
      },
    },
    {
      id: '8',
      data: {
        label: '公司8',
        group: 1,
      },
    },
    {
      id: '9',
      data: {
        label: '公司9',
        group: 2,
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: '1',
      target: '1',
      data: { type: 'loop-edge' },
    },
    {
      id: 'edge2',
      source: '2',
      target: '2',
      data: {
        type: 'loop-edge',
      },
    },
    {
      id: 'edge3',
      source: '1',
      target: '2',
      data: {
        dataType: 'A',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge4',
      source: '1',
      target: '3',
      data: {
        dataType: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge5',
      source: '2',
      target: '5',
      data: {
        dataType: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge6',
      source: '5',
      target: '6',
      data: {
        dataType: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge7',
      source: '3',
      target: '4',
      data: {
        dataType: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge8',
      source: '4',
      target: '7',
      data: {
        dataType: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge9',
      source: '1',
      target: '8',
      data: {
        dataType: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge10',
      source: '1',
      target: '9',
      data: {
        dataType: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const hullPlugin = new Extensions.Hull({
  key: 'hull-plugin',
});

const ExtGraph = extend(Graph, {
  edges: {
    'loop-edge': Extensions.LoopEdge,
  },
});

const graph = new ExtGraph({
  container,
  width,
  height,
  plugins: [hullPlugin],
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  },
  autoFit: 'view',
  layout: {
    type: 'grid',
  },
  data,
});

hullPlugin.addHull({
  id: 'hull1',
  padding: 15,
  type: 'smooth-convex', //'bubble' | 'round-convex' | 'smooth-convex';
  members: graph
    .getAllNodesData()
    .filter((model) => model.data.group === 1)
    .map((node) => node.id),
  labelShape: {
    text: 'Group1',
    position: 'left',
    offsetY: -2,
  },
});

hullPlugin.addHull({
  id: 'hull2',
  padding: 15,
  type: 'round-convex',
  members: graph
    .getAllNodesData()
    .filter((model) => model.data.group === 2)
    .map((node) => node.id),
  labelShape: {
    text: 'Group2',
    position: 'left',
    offsetY: -2,
  },
  style: {
    fill: 'pink',
    stroke: 'red',
  },
});

let memberAdded = false;
let nonMemberAdded = false;

const updateActions = [
  {
    name: 'Add/Delete Member',
    action: () => {
      if (!memberAdded) {
        hullPlugin.addHullMember('hull1', ['4']);
      } else {
        hullPlugin.removeHullMember('hull1', ['4']);
      }
      memberAdded = !memberAdded;
    },
  },
  {
    name: 'Update Config',
    action: () => {
      hullPlugin.updateHull({
        id: 'hull1',
        style: { fill: '#ff0' },
        labelShape: { text: 'updated-label', position: 'top' },
      });
    },
  },
];

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML = `👉 update:`;
btnContainer.appendChild(tip);
updateActions.forEach((item, i) => {
  const btn = document.createElement('a');
  btn.innerHTML = item.name;
  btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  btn.style.padding = '4px';
  btn.style.marginLeft = i > 0 ? '24px' : '8px';
  btnContainer.appendChild(btn);
  btn.addEventListener('click', () => {
    item.action();
  });
});

window.graph = graph;