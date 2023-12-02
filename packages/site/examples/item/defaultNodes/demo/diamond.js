import { Graph, Extensions, extend } from '@antv/g6';
const ExtGraph = extend(Graph, {
  nodes: {
    'diamond-node': Extensions.DiamondNode,
  },
});

const data = {
  nodes: [
    {
      id: 'diamond',
      data: {},
    },
    {
      id: 'diamond-active',
      data: {},
    },
    {
      id: 'diamond-selected',
      data: {},
    },

    {
      id: 'diamond-highlight',
      data: {},
    },
    {
      id: 'diamond-inactive',
      data: {},
    },
    {
      id: 'diamond-badges',
      data: {},
    },
    {
      id: 'diamond-anchorShapes',
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
        type: 'diamond-node',
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
  graph.setItemState('diamond-active', 'active', true);
  graph.setItemState('diamond-selected', 'selected', true);
  graph.setItemState('diamond-highlight', 'highlight', true);
  graph.setItemState('diamond-inactive', 'inactive', true);
});

window.graph = graph;