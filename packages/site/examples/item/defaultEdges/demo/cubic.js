import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  edges: {
    'cubic-edge': Extensions.CubicEdge,
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
        data: { x: 250, y: 200 },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {
          type: 'cubic-edge',
          keyShape: {
            /**
             * 控制点数组，默认：曲线中心附近
             * precise x-axis, y-axis coordinates of control points. Default is center of the curve
             */
            controlPoints: [],
            /**
             * 控制点在两端点连线上的相对位置，范围 0 - 1
             * Relative position of the control point on the line between the two endpoints, range 0 - 1
             */
            curvePosition: 0.5,
            /**
             * 控制点距离两端点连线的距离，可理解为控制边的弯曲程度
             * Distance of the control point from the line connecting the two end points
             */
            curveOffset: 30,
          },
        },
      },
    ],
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
