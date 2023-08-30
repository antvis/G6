import { Graph, Extensions, extend } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 100,
        y: 100,
      },
    },
    {
      id: 'node2',
      data: { x: 200, y: 100, type: 'rect-node' },
    },
    {
      id: 'node3',
      data: {
        x: 300,
        y: 100,
        type: 'ellipse-node',
        keyShape: {
          rx: 20,
          ry: 16,
        },
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node1',
      data: {
        type: 'loop-edge',
      },
    },
    {
      id: 'edge2',
      source: 'node2',
      target: 'node2',
      data: {
        type: 'loop-edge',
      },
    },
    {
      id: 'edge3',
      source: 'node3',
      target: 'node3',
      data: {
        type: 'loop-edge',
      },
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  nodes: {
    'ellipse-node': Extensions.EllipseNode,
  },
  edges: {
    'loop-edge': Extensions.LoopEdge,
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
  node: (nodeInnerModel) => {
    const { id, data } = nodeInnerModel;
    return {
      id,
      data,
    };
  },
  edge: (edgeInnerModel) => {
    const { id, data } = edgeInnerModel;
    return {
      id,
      data: {
        ...data,
        keyShape: {
          ...data.keyShape,
          loopCfg: {
            /**
             * 指定自环与节点的相对位置。默认为：top。支持的值有：top, top-right, right,bottom-right, bottom, bottom-left, left, top-left
             * The relative position relationship between self-loop edge and keyShape.
             */
            // position: 'top',
            /**
             * 指定是否顺时针画环，默认为  true
             * Specifies whether to draw the loop clockwise, default is true.
             */
            // clockwise: true,
            /**
             * 从节点 keyShape 的边缘到自环最顶端的位置，用于指定自环的曲度，默认为节点的高度
             * The position from edge of keyShape to the topmost point of the self-loop, defaults to the height of the node.
             */
            // dist: 100,
            /**
             * 对于非圆形节点设置的连接点与节点中心坐标（top-right，bottom-right,top-left,bottom-left较特殊，为四个角坐标）在 x 轴或 y 轴方向的偏移量，默认为 `节点宽高中最小值的1/4`
             * Except circle, the offset of the connection point from center (top-right, bottom-right, top-left, bottom-left, and more specifically, the four corners of the node) in the x/y-axis direction is set to be `¼ of the smallest value of the node's width or height'.
             */
            // pointPadding: 20,
          },
          endArrow: true,
        },
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
