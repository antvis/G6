import { Graph, Extensions, extend } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 250,
        y: 150,
        type: 'donut-node',
        /** Shapes of donut */
        donutShapes: {
          /**
           * 甜甜圈内径在 keyShape 半径的占比，取值为 0-1，默认 0.6
           * The ratio of the inner diameter of the donut to the radius of the keyShape, the value is 0-1
           */
          // innerSize: 0.5,
          /**
           * 甜甜圈字段，每个字段必须为 [key: string]: number
           * Donut fields, each field must be [key: string]: number
           */
          attrs: {
            income: 80,
            outcome: 40,
            unknown: 45,
          },
          /**
           * 甜甜圈颜色映射，字段名与 attrs 中的字段名对应。不指定则使用默认色板
           * A donut colormap with field names corresponding to those in attrs. If not specified, the default swatch will be used
           */
          // colorMap: {
          //   income: '#78D3F8',
          //   outcome: '#F08BB4',
          //   unknown: '#65789B',
          // },
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
  node: (innerModel) => {
    return {
      ...innerModel,
      data: {
        ...innerModel.data,
        keyShape: {
          r: 30,
        },
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
    };
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
