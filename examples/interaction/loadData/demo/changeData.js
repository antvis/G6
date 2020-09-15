import G6 from '@antv/g6';

/**
 * 该案例演示，当点击叶子节点时，如何动态向树图中添加多条数据。
 * 主要演示changeData的用法。
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
let i = 0;
graph.edge(function () {
  i++;
  return {
    type: 'cubic-horizontal',
    color: '#A3B1BF',
    label: i,
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
    const childData = [
      {
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
      },
      {
        id: 'child-data1-' + count,
        children: [
          {
            id: 'x1-' + count,
          },
          {
            id: 'y1-' + count,
          },
        ],
      },
    ];

    const parentData = graph.findDataById(nodeId);
    if (!parentData.children) {
      parentData.children = [];
    }
    // 如果childData是一个数组，则直接赋值给parentData.children
    // 如果是一个对象，则使用parentData.children.push(obj)
    parentData.children = childData;
    graph.changeData();
    count++;
  }
});
