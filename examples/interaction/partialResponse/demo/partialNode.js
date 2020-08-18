import G6 from '@antv/g6';
/**
 * 演示如何响应节点某一区域上的点击事件
 * by 长哲
 */

const GRAPH_CONTAINER = 'container';

// 注册自定义节点
G6.registerNode(
  'customNode',
  {
    // 绘制节点
    drawShape: function drawShape(cfg, group) {
      const shapeType = this.shapeType;
      const style = Object.assign({}, this.getShapeStyle(cfg), {
        x: 0,
        y: 0,
        r: 50,
      });
      const shape = group.addShape(shapeType, {
        attrs: style,
        name: 'key-shape',
      });
      // 绘制节点里面的小圆。点击这个小圆会显示tooltip
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: -30,
          r: 10,
          fill: '#096dd9',
          cursor: 'pointer',
        },
        name: 'circle-shape',
      });
      return shape;
    },
  },
  'circle',
);

const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 150,
      label: 'node1',
      size: 100,
      type: 'customNode',
    },
    {
      id: 'node2',
      x: 300,
      y: 150,
      label: 'node2',
      size: 100,
      type: 'customNode',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: GRAPH_CONTAINER,
  width,
  height,
  modes: {
    default: [
      {
        type: 'drag-node',
        delegate: false,
      },
    ],
  },
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
    labelCfg: {
      style: {
        fontSize: 12,
      },
    },
  },
  defaultEdge: {
    style: {
      stroke: '#e2e2e2',
    },
  },
  nodeStateStyles: {
    selected: {
      stroke: 'red',
    },
  },
});

graph.data(data);
graph.render();

// 节点上的点击事件
graph.on('node:click', function (event) {
  const { item } = event;
  graph.setItemState(item, 'selected', true);
});

graph.on('circle-shape:click', (evt) => {
  const { item } = evt;
  graph.updateItem(item, {
    label: '点击了圆',
    labelCfg: {
      style: {
        fill: '#003a8c',
        fontSize: 16,
      },
    },
  });
});
