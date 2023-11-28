import { Graph, Extensions, extend } from '@antv/g6';
const ExtGraph = extend(Graph, {
  nodes: {
    'triangle-node': Extensions.TriangleNode,
  },
});

const data = {
  nodes: [
    {
      id: 'triangle',
      data: {},
    },
    {
      id: 'triangle-active',
      data: {},
    },
    {
      id: 'triangle-selected',
      data: {},
    },

    {
      id: 'triangle-highlight',
      data: {},
    },
    {
      id: 'triangle-inactive',
      data: {},
    },
    {
      id: 'triangle-badges',
      data: {},
    },
    {
      id: 'triangle-anchorShapes',
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
        type: 'triangle-node',
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
          position: 'rightTop',
        },
        {
          position: 'leftTop',
        },
        {
          position: 'rightBottom',
        },
        {
          position: 'leftBottom',
        },
        {
          position: 'bottom',
        },
      ];
    }
    return config;
  },
});

graph.on('afterrender', (e) => {
  graph.setItemState('triangle-active', 'active', true);
  graph.setItemState('triangle-selected', 'selected', true);
  graph.setItemState('triangle-highlight', 'highlight', true);
  graph.setItemState('triangle-inactive', 'inactive', true);
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
