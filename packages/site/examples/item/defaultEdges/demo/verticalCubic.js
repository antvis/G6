import { Graph, Extensions, extend } from '@antv/g6';

const data = {
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
      data: { x: 200, y: 200 },
    },
    {
      id: 'node3',
      data: { x: 100, y: 200 },
    },
    {
      id: 'node4',
      data: { x: 150, y: 300 },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'edge2',
      source: 'node1',
      target: 'node3',
    },
    {
      id: 'edge3',
      source: 'node2',
      target: 'node4',
    },
    {
      id: 'edge4',
      source: 'node3',
      target: 'node4',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  edges: {
    'cubic-horizontal-edge': Extensions.CubicHorizontalEdge,
    'cubic-vertical-edge': Extensions.CubicVerticalEdge,
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
    anchorPoints: [
      [0.5, 0],
      [1, 0],
    ],
    keyShape: {
      width: 80,
      height: 30,
    },
  },
  edge: {
    type: 'cubic-vertical-edge',
    keyShape: {
      endArrow: true,
      /**
       * 控制点数组，默认：曲线 1/3 和 2/3 处
       * precise x-axis, y-axis coordinates of control points. Default: 1/3 and 2/3 of the curve
       */
      // controlPoints: [],
      /**
       * 控制点在两端点连线上的相对位置，范围 0 - 1
       * Relative position of the control point on the line between the two endpoints, range 0 - 1
       */
      // curvePosition: 0.5,
      /**
       * 控制点距离两端点连线的距离，可理解为控制边的弯曲程度
       * Distance of the control point from the line connecting the two end points
       */
      // curveOffset: 30,
    },
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
