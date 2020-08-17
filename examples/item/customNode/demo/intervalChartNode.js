import G6 from '@antv/g6';
import Chart from '@antv/chart-node-g6';

G6.registerNode(
  'node-with-interval',
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

      const view = new (Chart || window.Chart)({
        group,
        padding: 1,
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

      view.interval().position('genre*sold').color('genre');

      view.legend('genre', false);

      view.scale({
        genre: {
          alias: '游戏种类', // 列定义，定义该属性显示的别名
        },
        sold: {
          alias: '销售量',
        },
      });

      view.axis('sold', false);

      // 极坐标下的柱状图
      // view.coordinate('polar');

      view.render();

      console.log('定义时候的view', view);
      keyShape.set('intervalView', view);

      return keyShape;
    },
    update(cfg, item) {
      const keyShape = item.getKeyShape();
      const view = keyShape.get('intervalView');
      view.changeData(cfg.trendData);
    },
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
    type: 'node-with-interval',
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

// 点击节点，更新柱状图数据
graph.on('node:click', (evt) => {
  const newTrendData = [
    { genre: 'Sports', sold: 75 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 320 },
    { genre: 'Shooter', sold: 150 },
    { genre: 'Other', sold: 250 },
  ];

  graph.updateItem(evt.item, {
    trendData: newTrendData,
  });
});

graph.on('node:mouseenter', (evt) => {
  graph.setItemState(evt.item, 'hover', true);
});

graph.on('node:mouseleave', (evt) => {
  graph.setItemState(evt.item, 'hover', false);
});
