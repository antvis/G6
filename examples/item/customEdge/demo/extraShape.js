import G6 from '@antv/g6';

/**
 * Custom the edge with extra shapes
 * by Shiwu
 */

// custom the edge with an extra rect
G6.registerEdge(
  'extra-shape-edge',
  {
    afterDraw(cfg, group) {
      // get the first shape in the graphics group of this edge, it is the path of the edge here
      // 获取图形组中的第一个图形，在这里就是边的路径图形
      const shape = group.get('children')[0];
      // get the coordinate of the mid point on the path
      // 获取路径图形的中点坐标
      const midPoint = shape.getPoint(0.5);
      const rectColor = cfg.midPointColor || '#333';
      // add a rect on the mid point of the path. note that the origin of a rect shape is on its lefttop
      // 在中点增加一个矩形，注意矩形的原点在其左上角
      group.addShape('rect', {
        attrs: {
          width: 10,
          height: 10,
          fill: rectColor || '#333',
          // x and y should be minus width / 2 and height / 2 respectively to translate the center of the rect to the midPoint
          // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
          x: midPoint.x - 5,
          y: midPoint.y - 5
        }
      });

      // get the coordinate of the quatile on the path
      // 获取路径上的四分位点坐标
      const quatile = shape.getPoint(0.25);
      const quatileColor = cfg.quatileColor || '#333';
      // add a circle on the quatile of the path
      // 在四分位点上放置一个圆形
      group.addShape('circle', {
        attrs: {
          r: 5,
          fill: quatileColor || '#333',
          x: quatile.x,
          y: quatile.y
        }
      });
    },
    update: undefined
  },
  'cubic',
);

const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 100,
    },
    {
      id: 'node2',
      x: 300,
      y: 100,
    },
    {
      id: 'node3',
      x: 300,
      y: 200,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      midPointColor: '#f00',
      quatileColor: '#f00',
    },
    {
      source: 'node1',
      target: 'node3',
      midPointColor: '#0f0',
      quatileColor: '#0f0',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  modes: {
    default: [
      'drag-node',
      'drag-canvas',
    ],
  },
  defaultEdge: {
    type: 'extra-shape-edge',
    style: {
      stroke: '#F6BD16',
    },
  },
});
graph.data(data);
graph.render();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };