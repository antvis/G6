import { Graph, Extensions, extend } from '@antv/g6';

console.log('Extensions.DagreLayout', Extensions.DagreLayout);

const ExtGraph = extend(Graph, {
  layouts: {
    dagre: Extensions.DagreLayout,
  },
  edges: {
    'polyline-edge': Extensions.PolylineEdge,
  },
});

import insertCss from 'insert-css';

insertCss(`
  .g6-tooltip {
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background-color: #000;
    padding: 2px 8px;
    text-align: center;
  }
`);

const data = {
  nodes: [
    {
      id: '0',
      data: {
        label: '0',
      },
    },
    {
      id: '1',
      data: {
        label: '1',
      },
    },
    {
      id: '2',
      data: {
        label: '2',
      },
    },
    {
      id: '3',
      data: {
        label: '3',
      },
    },
    {
      id: '4',
      data: {
        label: '4',
      },
    },
    {
      id: '5',
      data: {
        label: '5',
      },
    },
    {
      id: '6',
      data: {
        label: '6',
      },
    },
    {
      id: '7',
      data: {
        label: '7',
      },
    },
    {
      id: '8',
      data: {
        label: '8',
      },
    },
    {
      id: '9',
      data: {
        label: '9',
      },
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
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  layout: layoutConfigs.Default,
  node: (node) => {
    return {
      id: node.id,
      data: {
        ...node.data,
        type: 'rect-node',
        lodStrategy: {},
        keyShape: {
          width: 60,
          height: 30,
          radius: 8,
        },
        labelShape: {
          position: 'center',
          maxWidth: '80%',
          text: `node-${node.data.label}`,
        },
        animates: {
          update: [
            {
              fields: ['x', 'y'],
            },
          ],
        },
      },
    };
  },
  edge: {
    type: 'polyline-edge',
    keyShape: {
      radius: 20,
      offset: 45,
      endArrow: true,
      lineWidth: 2,
      stroke: '#C2C8D5',
      routeCfg: {
        obstacleAvoidance: true,
      },
    },
  },
  modes: {
    default: ['drag-node', 'drag-canvas', 'zoom-canvas', 'click-select'],
  },
  autoFit: 'view',
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
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
    graph.layout(layoutConfigs[name]);
  });
});
