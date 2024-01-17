/**
 * Custom Bar chart with @antv/g2
 */
import { Graph, Extensions, extend } from '@antv/g6';
import { stdlib, renderToMountedElement } from '@antv/g2';

const G2Library = { ...stdlib() };
const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

class G2BarChartNode extends Extensions.RectNode {
  drawOtherShapes(model, shapeMap, diffData, diffState) {
    const { id, data } = model;
    const { radius = 50, value } = data;

    const group = this.upsertShape(
      'circle',
      'g2-active-chart-group',
      {
        r: radius,
        fill: '#fff',
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );

    const title = this.upsertShape(
      'text',
      'g2-active-chart-title',
      {
        y: radius + 10,
        fontSize: 10,
        text: id,
        textAlign: 'center',
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );

    // to make group trigger DOMNodeInsertedIntoDocument event
    group.isMutationObserved = true;
    group.addEventListener('DOMNodeInsertedIntoDocument', () => {
      const activeRadius = radius / 4;
      const activeSize = radius / 2;
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
              style: { transform: 'translateX(6)' },
            },
          ],
        },
        {
          group,
          library: G2Library,
        },
      );
    });

    return {
      'g2-active-chart-group': group,
      'g2-active-chart-title': title,
    };
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'g2-bar-chart': G2BarChartNode,
  },
});

const generateValue = () => {
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

const people = ['Aaron', 'Rebecca', 'Emily', 'Liam', 'Olivia', 'Ethan', 'Sophia', 'Mason'];
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  autoFit: 'center',
  layout: {
    type: 'force',
    preventOverlap: true,
    animated: false,
    linkDistance: (d) => {
      if (d.source === 'node0' || d.target === 'node0') {
        return 200;
      }
      return 80;
    },
  },
  modes: {
    default: [
      {
        type: 'drag-node',
        // prevent hide the node when dragging
        enableTransient: false,
      },
      'zoom-canvas',
    ],
  },
  data: {
    nodes: people.map((name, i) => ({
      id: name,
      data: { value: generateValue() },
    })),
    edges: people.map((_, i) => {
      return {
        id: `Edge${i}`,
        source: people[i],
        target: people[(i + 1) % 5],
      };
    }),
  },
  node: {
    type: 'g2-bar-chart',
    otherShapes: {},
  },
});

window.graph = graph;