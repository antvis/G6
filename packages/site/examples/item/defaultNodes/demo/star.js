import { Graph, Extensions, extend } from '@antv/g6';
const ExtGraph = extend(Graph, {
  nodes: {
    'star-node': Extensions.StarNode,
  },
});

const data = {
  nodes: [
    {
      id: 'star',
      data: {},
    },
    {
      id: 'star-active',
      data: {},
    },
    {
      id: 'star-selected',
      data: {},
    },

    {
      id: 'star-highlight',
      data: {},
    },
    {
      id: 'star-inactive',
      data: {},
    },
    {
      id: 'star-badges',
      data: {},
    },
    {
      id: 'star-anchorShapes',
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
        type: 'star-node',
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
          position: 'top',
        },
        {
          position: 'right',
        },
        {
          position: 'left',
        },
        {
          position: 'leftBottom',
        },
        {
          position: 'rightBottom',
        },
      ];
    }
    return config;
  },
});

graph.on('afterrender', (e) => {
  graph.setItemState('star-active', 'active', true);
  graph.setItemState('star-selected', 'selected', true);
  graph.setItemState('star-highlight', 'highlight', true);
  graph.setItemState('star-inactive', 'inactive', true);
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
