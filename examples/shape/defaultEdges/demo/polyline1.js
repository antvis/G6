import G6 from '@antv/g6';

/**
   * 该案例演示如何使用内置折线 polyline。
   * by 十吾
   */

const data = {
  nodes: [{
    id: '0',
    x: 150,
    y: 100
  }, {
    id: '1',
    x: 350,
    y: 300
  }],
  edges: [
  // 内置折线
    {
      source: '0',
      target: '1'
    }]
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
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    type: 'polyline',
    style: {
      stroke: '#F6BD16'
    }
  },
  modes: {
      // 支持的 behavior
    default: [ 'drag-node' ]
  }
});

graph.data(data);
graph.render();
