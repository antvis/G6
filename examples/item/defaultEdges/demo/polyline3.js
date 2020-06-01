import G6 from '@antv/g6';

/**
 * Usage of built-in polyline edge with controlPoints
 * by 十吾
 */

const data = {
  nodes: [
    {
      id: '4',
      x: 150,
      y: 100,
    },
    {
      id: '5',
      x: 350,
      y: 250,
    },
  ],
  edges: [
    {
      source: '4',
      target: '5',
      // assign the control points to control the bending positions
      controlPoints: [
        {
          x: 260,
          y: 80,
        },
        {
          x: 320,
          y: 50,
        },
        {
          x: 390,
          y: 110,
        },
        {
          x: 420,
          y: 110,
        },
        {
          x: 420,
          y: 140,
        },
      ],
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    type: 'polyline',
    style: {
      stroke: '#F6BD16',
    },
  },
  modes: {
    // behavior
    default: ['drag-node'],
  },
});

graph.data(data);
graph.render();
