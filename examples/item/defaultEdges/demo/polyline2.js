import G6 from '@antv/g6';

/**
 * Built-in polyline edge with configurations
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
    // configure the bending radius and min distance to the end nodes
    style: {
      radius: 10,
      offset: 30,
      endArrow: true,
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
