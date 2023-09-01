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
      id: 'rect-active',
      data: {
        x: 250,
        y: 300,
      },
    },
    {
      id: 'rect-selected',
      data: {
        x: 250,
        y: 450,
      },
    },

    {
      id: 'rect-highlight',
      data: {
        x: 400,
        y: 150,
      },
    },
    {
      id: 'rect-inactive',
      data: {
        x: 400,
        y: 300,
      },
    },
    {
      id: 'rect-badges',
      data: {
        x: 400,
        y: 450,
      },
    },
    {
      id: 'rect-anchorShapes',
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
  data,
  node: (model) => {
    const { id, data } = model;
    const config = {
      id,
      data: {
        ...data,
        type: 'rect-node',
        keyShape: {
          radius: 10,
        },
        labelShape: {
          text: 'label',
          position: 'bottom',
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
  graph.setItemState('rect-active', 'active', true);
  graph.setItemState('rect-selected', 'selected', true);
  graph.setItemState('rect-highlight', 'highlight', true);
  graph.setItemState('rect-inactive', 'inactive', true);
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
