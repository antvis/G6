import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'ellipse',
      label: 'Ellipse',
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
    type: 'ellipse',
    size: [180, 100],
    style: {
      fill: '#9EC9FF',
      stroke: '#5B8FF9',
      lineWidth: 3,
    },
    labelCfg: {
      style: {
        fill: '#1890ff',
        fontSize: 18,
      },
      position: 'bottom',
    },
    // configurations for four linkpoints
    linkPoints: {
      top: true,
      right: false,
      bottom: true,
      left: false,
      // the diameter of the linkPoint
      size: 10,
      lineWidth: 1,
      fill: '#fff',
      stroke: '#1890FF',
    },
    // icon configuration
    icon: {
      // whether show the icon
      show: true,
      // icon's img address, string type
      img:
        'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      width: 60,
      height: 60,
    },
  },
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  nodeStateStyles: {
    // node style of hover state
    hover: {
      fillOpacity: 0.8,
    },
    // node style of selected state
    selected: {
      lineWidth: 5,
    },
  },
});

graph.data(data);
graph.render();

graph.on('node:mouseenter', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'hover', true);
});

graph.on('node:mouseleave', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'hover', false);
});

graph.on('node:click', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'selected', true);
});
