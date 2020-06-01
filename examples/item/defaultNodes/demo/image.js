import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'image',
      img: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
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
    type: 'image',
    size: [260, 80],
    clipCfg: {
      show: false,
      // Clip type options: circle, ellipse, rect, path
      type: 'circle',
      // circle
      r: 30,
      // clip style
      style: {
        lineWidth: 1,
      },
    },
  },
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
});

graph.data(data);
graph.render();
