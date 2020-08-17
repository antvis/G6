import G6 from '@antv/g6';

/**
 * 该案例演示，当点击叶子节点时，如何向树图中动态添加数据。
 * 主要演示 addChild 和 layout 的用法。
 */
const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.TreeGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['collapse-expand', 'drag-canvas'],
  },
  fitView: true,
  layout: {
    type: 'compactBox',
    direction: 'LR',
    defalutPosition: [],
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
      return 50;
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
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
    label: node.id,
    labelCfg: {
      position: node.children && node.children.length > 0 ? 'left' : 'right',
    },
  };
});

graph.edge(function () {
  return {
    type: 'cubic-horizontal',
    color: '#A3B1BF',
  };
});

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
  ],
};
graph.data(data);
graph.render();

let count = 0;

graph.on('node:click', function (evt) {
  const item = evt.item;

  const nodeId = item.get('id');
  const model = item.getModel();
  const children = model.children;
  if (!children || children.length === 0) {
    const childData = {
      id: 'child-data-' + count,
      type: 'rect',
      children: [
        {
          id: 'x-' + count,
        },
        {
          id: 'y-' + count,
        },
      ],
    };
    graph.addChild(childData, nodeId);
    count++;
  }
});
