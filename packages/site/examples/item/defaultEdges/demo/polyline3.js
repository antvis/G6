import { Graph, Extensions, extend } from '@antv/g6';

const data = {
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
      data: {
        x: 550,
        y: 250,
      },
    },
    {
      id: 'node3',
      data: {
        x: 440,
        y: 60,
      },
    },
    {
      id: 'node4',
      data: {
        x: 340,
        y: 130,
      },
    },
    {
      id: 'node5',
      data: {
        x: 100,
        y: 350,
      },
    },
    {
      id: 'node6',
      data: {
        x: 300,
        y: 430,
      },
    },
    {
      id: 'node7',
      data: {
        x: 400,
        y: 350,
      },
    },
    {
      id: 'node8',
      data: {
        x: 600,
        y: 480,
      },
    },
    {
      id: 'enhanced-node',
      data: {
        x: 400,
        y: 130,
        preventPolylineEdgeOverlap: true,
        label: 'Enhanced Node',
      },
    },
    {
      id: 'normal-node',
      data: {
        x: 300,
        y: 300,
        label: 'Normal Node',
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node4',
      target: 'node2',
      data: {},
    },
    {
      id: 'edge2',
      source: 'node5',
      target: 'node6',
      data: {},
    },
    {
      id: 'edge3',
      source: 'node8',
      target: 'node7',
      data: {},
    },
    {
      id: 'edge4',
      source: 'node1',
      target: 'node3',
      data: {},
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
  plugins: [
    {
      // lod-controller will be automatically assigned to graph with `disableLod: false` to graph if it is not configured as following
      type: 'lod-controller',
      disableLod: true,
    },
  ],
  data,
  node: {
    type: 'circle-node',
    labelShape: {
      text: {
        fields: ['label'],
        formatter: (model) => model.data.label,
      },
      position: 'bottom',
      maxLines: 4,
    },
  },
  edge: {
    type: 'polyline-edge',
    keyShape: {
      endArrow: true,
      routeCfg: {
        /**
         * 目前支持正交路由 'orth' 和地铁路由 'er'
         */
        // name: 'er',
        /**
         * 是否开启自动避障，默认为 false
         * Whether to enable automatic obstacle avoidance, default is false
         */
        enableObstacleAvoidance: true,
      },
      /**
       * 拐弯处的圆角弧度，默认为直角，值为 0
       * The radius of the corner rounding, defaults to a right angle
       */
      // radius: 20,
      /**
       * 拐弯处距离节点最小距离, 默认为 2
       * Minimum distance from the node at the corner, default is 5.
       */
      // offset: 0,
      /**
       * 控制点数组，不指定时根据 A* 算法自动生成折线。若指定了，则按照 controlPoints 指定的位置进行弯折
       * An array of control points that, when not specified, automatically generates the bends according to the A* algorithm. If specified, bends are made at the position specified by controlPoints.
       */
      // controlPoints: [],
    },
  },
});

window.graph = graph;