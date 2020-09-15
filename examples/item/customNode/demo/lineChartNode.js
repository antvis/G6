import G6 from '@antv/g6';
import Chart from '@antv/chart-node-g6';

G6.registerNode(
  'node-with-line',
  {
    draw(cfg, group) {
      const keyShape = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 400,
          height: 200,
          fill: cfg.style.fill,
        },
      });

      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 400,
          height: 40,
          fill: '#69c0ff',
        },
      });

      group.addShape('text', {
        attrs: {
          text: '浏览申请完成率',
          x: 10,
          y: 25,
          fontSize: 14,
          fill: '#fff',
        },
      });

      group.addShape('text', {
        attrs: {
          text: '2020-06-07 ~ 2020-06-14 | 均值',
          x: 20,
          y: 70,
          fontSize: 13,
          fill: '#8c8c8c',
        },
      });

      group.addShape('text', {
        attrs: {
          text: '8.8%',
          x: 20,
          y: 110,
          fontSize: 30,
          fill: '#000',
        },
      });

      // 实际开发中把 (Chart || window.Chart) 换成 Chart
      const view = new (Chart || window.Chart)({
        group,
        padding: 5,
        region: {
          start: {
            x: 0.01,
            y: 0.2,
          },
          end: {
            x: 0.62,
            y: 0.33,
          },
        },
      });

      view.data(cfg.trendData);

      view.line().position('genre*sold').color('#9AD681').shape('dash');

      view.legend('genre', false);

      view.axis('sold', false);

      view.render();

      return keyShape;
    },
    update: null,
  },
  'single-node',
);

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;

const trendData = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const data = {
  nodes: [
    {
      id: 'nodeWithLine',
      label: 'nodeWithLine',
      trendData,
    },
  ],
};

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitView: true,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  defaultNode: {
    type: 'node-with-line',
    style: {
      fill: '#e6f7ff',
    },
  },
  nodeStateStyles: {
    hover: {
      stroke: '#b37feb',
    },
  },
});

graph.data(data);
graph.render();

graph.on('node:mouseenter', (evt) => {
  graph.setItemState(evt.item, 'hover', true);
});

graph.on('node:mouseleave', (evt) => {
  graph.setItemState(evt.item, 'hover', false);
});
