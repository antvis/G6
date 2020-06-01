import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
    },
    {
      id: 'node2',
      x: 250,
      y: 200,
      label: 'node2',
    },
    {
      id: 'node3',
      x: 100,
      y: 350,
      label: 'node3',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: 'edge 1',
    },
    {
      source: 'node2',
      target: 'node3',
      label: 'edge 2',
    },
    {
      source: 'node3',
      target: 'node1',
      label: 'edge 3',
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
    type: 'circle',
    size: [40],
    color: '#5B8FF9',
    style: {
      fill: '#9EC9FF',
      lineWidth: 3,
    },
    labelCfg: {
      style: {
        fill: '#1890ff',
        fontSize: 14,
        background: {
          fill: '#ffffff',
          stroke: '#9EC9FF',
          padding: [2, 2, 2, 2],
          radius: 2,
        },
      },
      position: 'bottom',
    },
  },
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  nodeStateStyles: {
    // style configurations for hover state
    hover: {
      fillOpacity: 0.8,
    },
    // style configurations for selected state
    selected: {
      lineWidth: 5,
    },
  },
});

graph.data(data);
graph.render();
