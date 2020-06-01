import G6 from '@antv/g6';

/**
 * The usage of arc edge
 * by Shiwu
 */

const data = {
  nodes: [
    {
      id: '0',
      x: 150,
      y: 50,
    },
    {
      id: '1',
      x: 350,
      y: 250,
    },
  ],
  edges: [
    // Built-in arc edges
    {
      id: 'edge0',
      source: '0',
      target: '1',
      label: 'curveOffset = 20',
      curveOffset: 20,
    },
    {
      id: 'edge1',
      source: '0',
      target: '1',
      label: 'curveOffset = 50', // the bending degree
      curveOffset: 50,
    },
    {
      id: 'edge2',
      source: '0',
      target: '1',
      label: 'curveOffset = -50', // the bending degree
      curveOffset: -50,
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  defaultNode: {
    size: 45,
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    type: 'arc',
    style: {
      stroke: '#F6BD16',
    },
    labelCfg: {
      autoRotate: true,
      refY: -10,
    },
  },
  modes: {
    // 支持的 behavior
    default: ['drag-node'],
  },
});

graph.data(data);
graph.render();
