import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'rect',
      label: 'rect',
      x: 250,
      y: 150,
    },
  ],
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  defaultNode: {
    type: 'rect',
    size: [160, 80],
    style: {
      fill: '#9EC9FF',
      stroke: '#5B8FF9',
      lineWidth: 3,
    },
    labelCfg: {
      style: {
        fill: '#fff',
        fontSize: 18,
      },
    },
    linkPoints: {
      top: true,
      bottom: true,
      left: true,
      right: true,
      size: 5,
      fill: '#fff',
      lineWidth: 1,
      stroke: '#1890FF',
    },
  },
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  nodeStateStyles: {
    // the style configurations for the hover state
    hover: {
      fillOpacity: 0.8,
    },
    // the style configurations for the selected state
    selected: {
      lineWidth: 5,
    },
  },
});

graph.data(data);
graph.render();

graph.on('node:mouseenter', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', true);
});

graph.on('node:mouseleave', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', false);
});

graph.on('node:click', evt => {
  const { item } = evt;
  graph.setItemState(item, 'selected', true);
});
