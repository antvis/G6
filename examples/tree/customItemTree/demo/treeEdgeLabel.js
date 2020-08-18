import G6 from '@antv/g6';

const data = {
  isRoot: true,
  id: 'Root',
  style: {
    fill: 'red',
  },
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
    {
      id: 'SubTreeNode7',
    },
    {
      id: 'SubTreeNode8',
    },
    {
      id: 'SubTreeNode9',
    },
    {
      id: 'SubTreeNode10',
    },
    {
      id: 'SubTreeNode11',
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.TreeGraph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  modes: {
    default: [
      {
        type: 'collapse-expand',
        onChange: function onChange(item, collapsed) {
          const data = item.get('model').data;
          data.collapsed = collapsed;
          return true;
        },
      },
      'drag-canvas',
      'zoom-canvas',
    ],
  },
  defaultNode: {
    size: 30,
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    style: {
      stroke: '#A3B1BF',
    },
  },
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
    getVGap: function getVGap() {
      return 10;
    },
    getHGap: function getHGap() {
      return 100;
    },
  },
});

graph.node(function (node) {
  return {
    size: 16,
    anchorPoints: [
      [0, 0.5],
      [1, 0.5],
    ],
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
    },
    label: node.id,
    labelCfg: {
      position: node.children && node.children.length > 0 ? 'left' : 'right',
      offset: 5,
    },
  };
});
let i = 0;
graph.edge(function () {
  i++;
  return {
    type: 'cubic-horizontal',
    color: '#A3B1BF',
    label: i,
  };
});

graph.data(data);
graph.render();
graph.fitView();
