import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  edges: {
    'cubic-horizontal-edge': Extensions.CubicHorizontalEdge,
    'cubic-vertical-edge': Extensions.CubicVerticalEdge,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const data = {
  isRoot: true,
  id: 'Root',
  children: [
    {
      id: 'SubTreeNode1',
      raw: {},
      children: [
        {
          id: 'SubTreeNode1.1',
        },
        {
          id: 'SubTreeNode1.2',
          children: [
            {
              id: 'SubTreeNode1.2.1',
            },
            {
              id: 'SubTreeNode1.2.2',
            },
            {
              id: 'SubTreeNode1.2.3',
            },
          ],
        },
      ],
    },
    {
      id: 'SubTreeNode2',
      children: [
        {
          id: 'SubTreeNode2.1',
        },
      ],
    },
    {
      id: 'SubTreeNode3',
      children: [
        {
          id: 'SubTreeNode3.1',
        },
        {
          id: 'SubTreeNode3.2',
        },
        {
          id: 'SubTreeNode3.3',
        },
      ],
    },
    {
      id: 'SubTreeNode4',
    },
    {
      id: 'SubTreeNode5',
    },
    {
      id: 'SubTreeNode6',
    },
  ],
};

const graph = new ExtGraph({
  container,
  width,
  height,
  data,
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  },
  node: (model) => {
    return {
      id: model.id,
      data: {
        ...model.data,
        labelBackgroundShape: {},

        labelShape: {
          text: model.id,
          position: model.data.childrenIds?.length ? 'left' : 'right',
          offsetX: model.data.childrenIds?.length ? -10 : 10,
          maxWidth: '300%',
        },
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
    };
  },
  edge: {
    type: 'cubic-horizontal-edge',
  },
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getHeight: function getHeight() {
      return 32;
    },
    getWidth: function getWidth() {
      return 32;
    },
    getVGap: function getVGap() {
      return 10;
    },
    getHGap: function getHGap() {
      return 100;
    },
  },
  autoFit: 'view',
  data: {
    type: 'treeData',
    value: data,
  },
});

/** Click */
let count = 0;

graph.on('node:click', (event) => {
  const { itemId } = event;

  const newNodes = [
    { id: `child-data1-${count}`, data: { type: 'rect-node' } },
    { id: `x1-${count}` },
    { id: `y1-${count}` },
    { id: `child-data2-${count}`, data: { type: 'rect-node' } },
    { id: `x2-${count}` },
    { id: `y2-${count}` },
  ];

  const newEdges = [
    { id: `edge1-${count}`, source: itemId, target: `child-data1-${count}` },
    { id: `edge2-${count}`, source: itemId, target: `child-data2-${count}` },
    { id: `edge3-${count}`, source: `child-data1-${count}`, target: `x1-${count}` },
    { id: `edge4-${count}`, source: `child-data1-${count}`, target: `y1-${count}` },
    { id: `edge5-${count}`, source: `child-data2-${count}`, target: `x2-${count}` },
    { id: `edge6-${count}`, source: `child-data2-${count}`, target: `y2-${count}` },
  ];

  graph.addData('node', newNodes);
  graph.addData('edge', newEdges);

  graph.layout();
  count++;
});

graph.on('canvas:click', (e) => graph.layout());

const tip = document.createElement('span');
tip.innerHTML = 'Click on the leaf node to dynamically add multiple pieces of data to the tree diagram.';
tip.style.position = 'absolute';
container.appendChild(tip);

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
// });
