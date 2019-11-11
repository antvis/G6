import G6 from '@antv/g6';

/**
   * 该案例演示如何使用内置折线 polyline。
   * by 十吾
   */

const data = {
  nodes: [{
    id: '2',
    x: 150,
    y: 150
  }, {
    id: '3',
    x: 350,
    y: 250
  }],
  edges: [
  // 配置内置折线的弯折弧度、端点最小距离
    {
      source: '2',
      target: '3'
    }]
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  defaultEdge: {
    shape: 'polyline',
    style: {
      radius: 10,
      offset: 30,
      endArrow: true,
      stroke: '#bae7ff'
    }
  },
  modes: {
      // 支持的 behavior
    default: [ 'drag-node' ]
  }
});

graph.data(data);
graph.render();
