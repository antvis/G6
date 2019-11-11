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

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  modes: {
    default: [ 'drag-canvas' ]
  },
  defaultEdge: {
    shape: 'cubic-horizontal',
    style: {
      stroke: '#bae7ff'
    }
  }
});
graph.data(data);
graph.render();
