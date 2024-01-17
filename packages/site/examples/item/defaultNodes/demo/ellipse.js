import { Graph, extend, Extensions } from '@antv/g6';

const ExtGraph = extend(Graph, {
  nodes: {
    'ellipse-node': Extensions.EllipseNode,
  },
});

const data = {
  nodes: [
    {
      id: 'ellipse',
      data: {},
    },
    {
      id: 'ellipse-active',
      data: {},
    },
    {
      id: 'ellipse-selected',
      data: {},
    },

    {
      id: 'ellipse-highlight',
      data: {},
    },
    {
      id: 'ellipse-inactive',
      data: {},
    },
    {
      id: 'ellipse-badges',
      data: {},
    },
    {
      id: 'ellipse-anchorShapes',
      data: {},
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
  },
  plugins: [
    {
      // lod-controller will be automatically assigned to graph with `disableLod: false` to graph if it is not configured as following
      type: 'lod-controller',
      disableLod: true,
    },
  ],
  data,
  layout: {
    type: 'grid',
  },
  node: (model) => {
    const { id, data } = model;
    const config = {
      id,
      data: {
        ...data,
        type: 'ellipse-node',
        labelShape: {
          text: id,
          position: 'bottom',
          maxWidth: '500%',
        },
        labelBackgroundShape: {},
        iconShape: {
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        },
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
    };
    if (id.includes('badges')) {
      config.data.badgeShapes = [
        {
          text: 'A',
          position: 'rightTop',
        },
        {
          text: 'Important',
          position: 'right',
        },
        {
          text: 'Notice',
          position: 'rightBottom',
        },
      ];
    }
    if (id.includes('anchorShapes')) {
      config.data.anchorShapes = [
        {
          position: [0, 0.5],
        },
        {
          position: [0.5, 0],
        },
        {
          position: [0.5, 1],
        },
        {
          position: [1, 0.5],
        },
      ];
    }
    return config;
  },
});

graph.on('afterrender', (e) => {
  graph.setItemState('ellipse-active', 'active', true);
  graph.setItemState('ellipse-selected', 'selected', true);
  graph.setItemState('ellipse-highlight', 'highlight', true);
  graph.setItemState('ellipse-inactive', 'inactive', true);
});

window.graph = graph;