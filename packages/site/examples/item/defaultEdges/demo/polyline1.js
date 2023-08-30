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
  data: {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 150,
          y: 100,
        },
      },
      {
        id: 'node2',
        data: { x: 300, y: 200 },
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
            radius: 0,
            /**
             * 拐弯处距离节点最小距离, 默认为 5
             */
            offset: 5,
            /**
             * 控制点数组，不指定时根据 A* 算法自动生成折线。若指定了，则按照 controlPoints 指定的位置进行弯折
             */
            // controlPoints: [],

            // routeCfg: {}
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

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
