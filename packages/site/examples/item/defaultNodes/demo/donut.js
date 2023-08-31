import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const data = {
  nodes: [
    {
      id: 'donut',
      data: {
        x: 250,
        y: 150,
        /**
         * 甜甜圈内径在 keyShape 半径的占比，取值为 0-1，默认 0.6
         * The ratio of the inner diameter of the donut to the radius of the keyShape, the value is 0-1
         */
        innerSize: 0.6,
        /**
         * 甜甜圈字段，每个字段必须为 [key: string]: number
         * Donut fields, each field must be [key: string]: number
         */
        donutAttr: {
          income: 80,
          outcome: 40,
          unknown: 45,
        },
        /**
         * 甜甜圈颜色映射，字段名与 attrs 中的字段名对应。不指定则使用默认色板
         * A donut colormap with field names corresponding to those in attrs. If not specified, the default swatch will be used
         */
        donutColorMap: {
          income: '#78D3F8',
          outcome: '#F08BB4',
          unknown: '#65789B',
        },
      },
    },
  ],
};

const ExtGraph = extend(Graph, {
  nodes: {
    'donut-node': Extensions.DonutNode,
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
    type: 'donut-node',
    keyShape: {
      r: 30,
    },
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
    /** Shapes of donut */
    donutShapes: {
      innerSize: { fields: ['innerSize'], formatter: (model) => model.data.innerSize },
      attrs: {
        fields: ['donutAttr'],
        formatter: (model) => model.data.donutAttr,
      },

      colorMap: {
        fields: ['donutColorMap'],
        formatter: (model) => model.data.donutColorMap,
      },
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
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
