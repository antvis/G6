import { Graph, Extensions, extend } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'ellipse',
      data: {
        x: 250,
        y: 150,
        type: 'ellipse-node',
        keyShape: {
          /**
           * 水平半径，默认 30
           * the horizontal radius of the ellipse, default is 30
           */
          // rx: 30,
          /**
           * 垂直半径，数字可选，默认 20
           * the vertical radius of the ellipse, default is 20
           */
          // ry: 20,
        },
      },
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  nodes: {
    'ellipse-node': Extensions.EllipseNode,
  },
});

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
  },
  data,
  node: {
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
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
