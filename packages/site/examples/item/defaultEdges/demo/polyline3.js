import { Graph, Extensions, extend } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 140,
        y: 130,
        labelShape: {
          text: 'node1',
        },
      },
    },
    {
      id: 'node2',
      data: {
        x: 400,
        y: 200,
        labelShape: {
          text: 'node2',
        },
      },
    },
    {
      id: 'obstacle1',
      data: {
        x: 300,
        y: 90,
        labelShape: {
          text: 'obstacle1',
        },
      },
    },
    {
      id: 'obstacle2',
      data: {
        x: 300,
        y: 200,
        labelShape: {
          text: 'obstacle2',
        },
      },
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
           * 拐弯处的圆角弧度，默认为直角，值为 0
           * The radius of the corner rounding, defaults to a right angle
           */
          // radius: 20,
          /**
           * 拐弯处距离节点最小距离, 默认为 5
           * Minimum distance from the node at the corner, default is 5.
           */
          offset: 20,
          /**
           * 控制点数组，不指定时根据 A* 算法自动生成折线。若指定了，则按照 controlPoints 指定的位置进行弯折
           * An array of control points that, when not specified, automatically generates the bends according to the A* algorithm. If specified, bends are made at the position specified by controlPoints.
           */
          // controlPoints: [],
          routeCfg: {
            name: 'er',
            /**
             * 是否开启自动避障，默认为 false
             * Whether to enable automatic obstacle avoidance, default is false
             */
            obstacleAvoidance: true,
          },
        },
      },
    },
  ],
};

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
  data,
  node: {
    type: 'rect-node',
    keyShape: {
      width: 60,
      height: 30,
    },
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
