import { Circle as CircleGeometry } from '@antv/g';
import { renderToMountedElement, stdlib } from '@antv/g2';
import { Circle, ExtensionCategory, Graph, register } from '@antv/g6';

class ActivityChart extends Circle {
  onCreate() {
    const { value } = this.attributes;
    const radius = this.shapeMap.key.style.r;
    const activeRadius = radius / 4;
    const activeSize = radius / 2;

    const group = this.upsert(
      'chart-container',
      CircleGeometry,
      {
        r: radius,
        fill: '#fff',
      },
      this.shapeMap.key,
    );

    renderToMountedElement(
      // @antv/g2 Specification
      // https://g2.antv.antgroup.com/examples/general/radial/#apple-activity
      {
        x: -radius,
        y: -radius,
        width: radius * 2,
        height: radius * 2,
        type: 'view',
        data: value,
        margin: 0,
        coordinate: { type: 'radial', innerRadius: 0.2 },
        children: [
          {
            type: 'interval',
            encode: { x: 'name', y: 1, size: activeSize, color: 'color' },
            scale: { color: { type: 'identity' } },
            style: { fillOpacity: 0.25 },
            animate: false,
            tooltip: false,
          },
          {
            type: 'interval',
            encode: { x: 'name', y: 'percent', color: 'color', size: activeSize },
            style: {
              radius: activeRadius,
              shadowColor: 'rgba(0,0,0,0.45)',
              shadowBlur: 20,
              shadowOffsetX: -2,
              shadowOffsetY: -5,
            },
            animate: {
              enter: { type: 'fadeIn', duration: 1000 },
            },
            axis: false,
            tooltip: false,
          },
          {
            type: 'image',
            encode: { x: 'name', y: 0, src: (d) => d.icon, size: 6 },
            style: { transform: [['translateX', 6]] },
          },
        ],
      },
      {
        group,
        library: stdlib(),
      },
    );
  }
}

const people = ['Aaron', 'Rebecca', 'Emily', 'Liam', 'Olivia', 'Ethan', 'Sophia', 'Mason'];

const mockData = () => {
  const getRandomPercent = () => +(Math.random() * 0.9 + 0.1).toFixed(1);

  return [
    {
      name: 'activity1',
      percent: getRandomPercent(),
      color: '#1ad5de',
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/ck11Y6aRrz/shangjiantou.png',
    },
    {
      name: 'activity2',
      percent: getRandomPercent(),
      color: '#a0ff03',
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/zY2JB7hhrO/shuangjiantou.png',
    },
    {
      name: 'activity3',
      percent: getRandomPercent(),
      color: '#e90b3a',
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/%24qBxSxdK05/jiantou.png',
    },
  ];
};

register(ExtensionCategory.NODE, 'activity-chart', ActivityChart);

const graph = new Graph({
  container: 'container',
  autoFit: 'view',
  data: {
    nodes: people.map((name, i) => ({
      id: name,
      style: { value: mockData() },
    })),
    edges: people.map((_, i) => {
      return {
        id: `edge${i}`,
        source: people[i],
        target: people[(i + 1) % 5],
      };
    }),
  },
  node: {
    type: 'activity-chart',
    style: {
      size: 50,
      labelText: (d) => d.id,
      fillOpacity: 0,
    },
    animation: {
      enter: false,
    },
  },
  layout: {
    type: 'force',
    preventOverlap: true,
    animated: false,
  },
  behaviors: ['zoom-canvas', 'drag-element'],
});

graph.render();
