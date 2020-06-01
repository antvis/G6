import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'star',
      label: 'Star',
      x: 250,
      y: 200,
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
    type: 'star',
    size: [120, 60],
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
      offset: 50,
    },
    // configurations for the five linkpoints
    linkPoints: {
      top: true,
      right: true,
      left: true,
      leftBottom: true,
      rightBottom: true,
      // the size of the linkpoints' circle
      size: 5,
      lineWidth: 1,
      fill: '#fff',
      stroke: '#1890FF',
    },
    // configurations for the icon
    icon: {
      // whether to show the icon
      show: true,
      // the image url for the icon, string type
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
