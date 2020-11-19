import G6 from '@antv/g6';
import Chart from '@antv/chart-node-g6';

G6.registerNode(
  'node-with-pie',
  {
    draw(cfg, group) {
      const keyShape = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: 100,
          fill: cfg.style.fill,
          stroke: cfg.style.stroke,
          fillOpacity: 0
        },
      });

      // 实际开发中把 (Chart || window.Chart) 换成 Chart
      // Replace (Chart || window.Chart) by Chart in your project
      const view = new (Chart || window.Chart)({
        group,
        width: 400,
        height: 200,
        x: -200,
        y: -100
      });

      view.data(cfg.trendData);

      view
        .interval()
        .position('year*population')
        .label('year', {
          offset: -15,
        })
        .color('year')
        .style({
          lineWidth: 1,
          stroke: '#95de64',
          fontSize: 8,
        });

      view.axis(false);

      view.legend(false);

      // 极坐标下的柱状图
      view.coordinate('polar');

      view.render();

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

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const trendData1 = [
  { year: '2001', population: 41.8 },
  { year: '2002', population: 38 },
  { year: '2003', population: 33.7 },
  { year: '2004', population: 30.7 },
  { year: '2005', population: 25.8 },
  { year: '2006', population: 31.7 },
  { year: '2007', population: 33 },
  { year: '2008', population: 46 },
  { year: '2009', population: 38.3 },
  { year: '2010', population: 28 },
  { year: '2011', population: 42.5 },
  { year: '2012', population: 30.3 },
];

const trendData2 = [
  { year: '2001', population: 11.8 },
  { year: '2002', population: 28 },
  { year: '2003', population: 43.7 },
  { year: '2004', population: 50.7 },
  { year: '2005', population: 15.8 },
  { year: '2006', population: 21.7 },
  { year: '2007', population: 13 },
  { year: '2008', population: 26 },
  { year: '2009', population: 18.3 },
  { year: '2010', population: 58 },
  { year: '2011', population: 62.5 },
  { year: '2012', population: 10.3 },
];

const data = {
  nodes: [
    {
      id: 'node0',
      trendData: trendData1,
      x: 10,
      y: 100
    },
    {
      id: 'node1',
      trendData: trendData2,
      x: 550,
      y: 100
    },
  ],
  edges: [{ source: 'node0', target: 'node1' }]
};

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitView: true,
  linkCenter: true,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
  },
  defaultNode: {
    type: 'node-with-pie',
    style: {
      fill: '#e6f7ff',
    },
  },
  nodeStateStyles: {
    hover: {
      stroke: '#b37feb',
    },
  },
  defaultEdge: {
    style: {
      lineWidth: 5,
      stroke: '#666'
    }
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

window.onresize = () => {
  if (!graph || graph.get('destroyed')) return;
  if (!container || !container.scrollWidth || !container.scrollHeight) return;
  graph.changeSize(container.scrollWidth, container.scrollHeight);
};