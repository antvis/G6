import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 250,
        y: 150,
        type: 'rect-node',
        keyShape: {
          /**
           * 矩形的宽度，默认为32
           * the width of the rectangle, default is 32
           */
          // width: 32,
          /**
           * 矩形的高度，默认为32
           * the height of the rectangle, default is 32
           */
          // height: 32,
        },
      },
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
  },
  data,
  node: {
    labelShape: {
      text: 'label',
      position: 'bottom',
    },
    labelBackgroundShape: {
      fill: 'red',
    },
    anchorShapes: [
      {
        position: [0, 0.5],
        r: 2,
        fill: 'red',
      },
    ],
    iconShape: {
      img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      width: 20,
      height: 20,
    },
    badgeShapes: [
      {
        text: '1',
        position: 'rightTop',
        color: 'blue',
      },
    ],
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
