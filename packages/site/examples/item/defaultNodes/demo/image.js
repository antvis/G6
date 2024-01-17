import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 250,
        y: 150,
      },
    },
    {
      id: 'image-active',
      data: {
        x: 250,
        y: 300,
      },
    },
    {
      id: 'image-selected',
      data: {
        x: 250,
        y: 450,
      },
    },

    {
      id: 'image-highlight',
      data: {
        x: 400,
        y: 150,
      },
    },
    {
      id: 'image-inactive',
      data: {
        x: 400,
        y: 300,
      },
    },
    {
      id: 'image-badges',
      data: {
        x: 400,
        y: 450,
      },
    },
    {
      id: 'image-anchorShapes',
      data: {
        x: 550,
        y: 150,
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
        type: 'image-node',
        keyShape: {
          src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        },
        labelShape: {
          text: id,
          position: 'bottom',
          maxWidth: '500%',
        },
        labelBackgroundShape: {},
        haloShape: {},
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
  graph.setItemState('image-active', 'active', true);
  graph.setItemState('image-selected', 'selected', true);
  graph.setItemState('image-highlight', 'highlight', true);
  graph.setItemState('image-inactive', 'inactive', true);
});

window.graph = graph;