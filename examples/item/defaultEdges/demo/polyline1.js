import G6 from '@antv/g6';

/**
 * The usage of built-in polyline
 * by Shiwu
 */

const data = {
  nodes: [
    {
      id: '0',
      x: 150,
      y: 100,
    },
    {
      id: '1',
      x: 350,
      y: 300,
    },
  ],
  edges: [
    // Built-in polyline
    {
      source: '0',
      target: '1',
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
