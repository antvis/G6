import G6 from '@antv/g6';

/**
 * 该案例演示如何通过复写复写draw方法自定义折线。
 * by siogo 提供的 issue（https://github.com/antvis/g6/issues/814）
 *
 * 如果要适应所有拖动情况，则需要根据拖动的位置来动态改变锚点
 */
G6.registerEdge('line-arrow', {
  options: {
    style: {
      stroke: '#ccc',
    },
  },
  draw: function draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const stroke = (cfg.style && cfg.style.stroke) || this.options.style.stroke;

    const keyShape = group.addShape('path', {
      attrs: {
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
          ['L', endPoint.x, endPoint.y],
        ],
        stroke,
        lineWidth: 1,
        startArrow: {
          path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
        },
        endArrow: {
          path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
        },
      },
      className: 'edge-shape',
      name: 'edge-shape',
    });
    return keyShape;
  },
});

const data = {
  nodes: [
    {
      id: '7',
      x: 150,
      y: 100,
      size: 40,
      anchorPoints: [
        [1, 0.5],
        [1, 0],
      ],
    },
    {
      id: '8',
      x: 300,
      y: 200,
      size: 40,
      anchorPoints: [
        [0, 0.5],
        [0, 1],
      ],
    },
  ],
  edges: [
    {
      source: '7',
      target: '8',
      sourceAnchor: 0,
      targetAnchor: 0,
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    // 支持的 behavior
    default: ['drag-node', 'drag-canvas'],
  },
  defaultNode: {
    type: 'circle',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
    linkPoints: {
      left: true,
      right: true,
      fill: '#fff',
      stroke: '#1890FF',
      size: 3,
    },
  },
  defaultEdge: {
    type: 'line-arrow',
    style: {
      stroke: '#F6BD16',
    },
  },
});

graph.data(data);
graph.render();
