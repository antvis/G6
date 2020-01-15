import G6 from '@antv/g6';
/**
   * 该案例演示以下功能：
   *  1、渲染群组所需要的数据结构；
   *  2、如何拖动一个群组；
   *  3、将节点从群组中拖出；
   *  4、将节点拖入到某个群组中；
   *  5、拖出拖入节点后动态改变群组大小。
  */

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    shape: 'circle',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    color: '#e2e2e2'
  },
  modes: {
    default: [ 'drag-canvas', 'drag-group', 'drag-node-with-group', 'collapse-expand-group' ]
  },
  groupType: 'rect'
});

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1-group1',
      groupId: 'group1',
      x: 100,
      y: 100
    },
    {
      id: 'node2',
      label: 'node2-group2',
      groupId: 'group1',
      x: 150,
      y: 200
    },
    {
      id: 'node3',
      label: 'node3-group2',
      groupId: 'group2',
      x: 300,
      y: 200
    },
    {
      id: 'node10',
      label: 'node10-p2',
      groupId: 'p2',
      x: 300,
      y: 310
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    },
    {
      source: 'node2',
      target: 'node3'
    },
    {
      source: 'node1',
      target: 'node3'
    }
  ],
  groups: [
    {
      id: 'group1',
      title: {
        text: '我的群组1',
        stroke: '#444'
      }
    },
    {
      id: 'group2',
      title: {
        text: '群组2',
        stroke: '#444'
      },
      parentId: 'p2'
    },
    {
      id: 'p2',
      title: '群组3'
    }
  ]
};

graph.data(data);
graph.render();
