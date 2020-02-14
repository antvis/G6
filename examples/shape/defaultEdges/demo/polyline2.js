import G6 from '@antv/g6';

/**
 * 该案例演示如何使用内置折线 polyline。
 * by 十吾
 */

const data = {
  nodes: [
    {
      id: '2',
      x: 150,
      y: 150,
    },
    {
      id: '3',
      x: 350,
      y: 250,
    },
  ],
  edges: [
    // 配置内置折线的弯折弧度、端点最小距离
    {
      source: '2',
      target: '3',
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    type: 'polyline',
    style: {
      radius: 10,
      offset: 30,
      endArrow: true,
      stroke: '#F6BD16',
    },
  },
  modes: {
    // 支持的 behavior
    default: ['drag-node'],
  },
});

graph.data(data);
graph.render();
