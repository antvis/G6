import { Graph, Extensions, extend } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'diamond',
      data: {
        x: 250,
        y: 150,
      },
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  nodes: {
    'diamond-node': Extensions.DiamondNode,
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
    type: 'diamond-node',
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
      position: 'bottom',
    },
    labelBackgroundShape: {},
    anchorShapes: [
      {
        position: [0, 0.5],
      },
      {
        position: [0.5, 0],
      },
      {
        position: [0.5, 1],
      },
    ],
    iconShape: {
      img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      width: 20,
      height: 20,
    },
    badgeShapes: [
      {
        text: 'A',
        position: 'rightTop',
      },
    ],
    animates: {
      update: [
        {
          fields: ['opacity'],
          shapeId: 'haloShape',
          states: ['selected', 'active'],
        },
        {
          fields: ['lineWidth'],
          shapeId: 'keyShape',
          states: ['selected', 'active'],
        },
      ],
    },
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
