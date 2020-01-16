import G6 from '@antv/g6';

/**
   * 该案例演示如何使用内置折线 polyline。
   * by 十吾
   */

const data = {
  nodes: [{
    id: '4',
    x: 150,
    y: 100
  }, {
    id: '5',
    x: 350,
    y: 250
  }],
  edges: [
  // 带有 controlPoints，则按照给定控制点弯折
    {
      source: '4',
      target: '5',
      controlPoints: [{
        x: 260,
        y: 80
      }, {
        x: 320,
        y: 50
      }, {
        x: 390,
        y: 110
      }, {
        x: 420,
        y: 110
      }, {
        x: 420,
        y: 140
      }]
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
