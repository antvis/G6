import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'rect1',
      label: 'rect1',
      description: 'description, hidden when undefined',
      x: 250,
      y: 150,
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
    type: 'modelRect',
    size: [270, 80],
    style: {
      radius: 5,
      stroke: '#69c0ff',
      fill: '#ffffff',
      lineWidth: 1,
      fillOpacity: 1,
    },
    // label configurations
    labelCfg: {
      style: {
        fill: '#595959',
        fontSize: 14,
      },
      offset: 30,
    },
    // left rect
    preRect: {
      show: true,
      width: 4,
      fill: '#40a9ff',
      radius: 2,
    },
    // configurations for the four linkpoints
    linkPoints: {
      top: false,
      right: false,
      bottom: false,
      left: false,
      // the size of the linkpoints' circle
      size: 3,
      lineWidth: 1,
      fill: '#72CC4A',
      stroke: '#72CC4A',
    },
    // configurations for the icon
    logoIcon: {
      // whether to show the icon
      show: true,
      x: 0,
      y: 0,
      // the image url for the icon, string type
      img:
        'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
      width: 16,
      height: 16,
      // adjust the offset along x-axis for the icon
      offset: 0,
    },
    // configurations for state icon
    stateIcon: {
      // whether to show the icon
      show: true,
      x: 0,
      y: 0,
      // the image url for the icon, string type
      img:
        'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
      width: 16,
      height: 16,
      // adjust hte offset along x-axis for the icon
      offset: -5,
    },
  },
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  nodeStateStyles: {
    hover: {
      lineWidth: 2,
      stroke: '#1890ff',
      fill: '#e6f7ff',
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
