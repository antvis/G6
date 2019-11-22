import G6 from '@antv/g6';

/**
 * 演示贝塞尔曲线的用法
 *
 *  **/
const data = {
  nodes: [{
    id: 'node5',
    x: 150,
    y: 200,
    label: '5',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }, {
    id: 'node6',
    x: 300,
    y: 150,
    label: '6',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }, {
    id: 'node7',
    x: 300,
    y: 250,
    label: '7',
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
  }],
  edges: [{
    source: 'node5',
    target: 'node6',
    shape: 'cubic-horizontal'
  }, {
    source: 'node5',
    target: 'node7',
    shape: 'cubic-horizontal'
  }]
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: [ 'drag-canvas' ]
  },
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    shape: 'cubic-horizontal',
    style: {
      stroke: '#F6BD16'
    }
  }
});
graph.data(data);
graph.render();
