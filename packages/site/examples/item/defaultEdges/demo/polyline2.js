import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  edges: {
    'polyline-edge': Extensions.PolylineEdge,
  },
});

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
  data: {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 140,
          y: 130,
        },
      },
      {
        id: 'node2',
        data: { x: 400, y: 200 },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {
          type: 'polyline-edge',
          keyShape: {
            /**
             * 拐弯处的圆角弧度，默认为直角
             */
            radius: 20,
            /**
             * 拐弯处距离节点最小距离, 默认为 5
             */
            // offset: 0,
            /**
             * 控制点数组，不指定时根据 A* 算法自动生成折线。若指定了，则按照 controlPoints 指定的位置进行弯折
             */
            controlPoints: [
              { x: 220, y: 220 },
              { x: 300, y: 130 },
            ],
          },
        },
      },
    ],
  },
  node: (nodeInnerModel) => {
    const { id, data } = nodeInnerModel;
    return {
      id,
      data,
    };
  },
  edge: {
    keyShape: {
      endArrow: true,
    },
  },
});

window.graph = graph;