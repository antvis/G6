import { idOf } from '@/src/utils/id';
import { Graph } from '@antv/g6';

export const elementNodeDonut: TestCase = async (context) => {
  const data = {
    nodes: [
      {
        id: 'default',
        style: {
          innerR: '60%',
          donuts: [
            {
              color: 'orange',
              lineWidth: 2,
            },
          ],
          fill: 'purple',
        },
      },
      {
        id: 'halo',
        style: {
          donuts: [{ color: 'red' }, { color: 'green' }],
        },
      },
      {
        id: 'badges',
        style: {
          donuts: [1, 2, 3],
        },
      },
      {
        id: 'ports',
        style: {
          donuts: [1, 1, 1],
        },
      },
      {
        id: 'active',
        states: ['active'],
        style: {
          donuts: [
            {
              value: 20,
            },
            {
              value: 1000,
            },
          ],
        },
      },
      {
        id: 'selected',
        states: ['selected'],
        style: {
          donuts: [{ value: 1000 }, { value: 20 }],
        },
      },
      {
        id: 'highlight',
        states: ['highlight'],
        style: {
          donutLineWidth: 1,
          donutStroke: '#fff',
          donuts: [1, 2, 3],
        },
      },
      {
        id: 'inactive',
        states: ['inactive'],
        style: {
          innerR: 0,
          donuts: [{ fill: 'red' }, { fill: 'green' }],
        },
      },
      {
        id: 'disabled',
        states: ['disabled'],
        style: {
          innerR: '50%',
          donuts: [{ color: 'green' }, { color: 'red' }],
        },
      },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'donut', // 👈🏻 Node shape type.
      style: {
        size: 40,
        innerR: (d: any) => d.style.innerR ?? '50%',
        labelText: (d) => d.id,
        iconHeight: 20,
        iconWidth: 20,
        iconFontFamily: 'iconfont',
        iconText: '\ue602',
        halo: (d) => idOf(d).toString().includes('halo'),
        portR: 3,
        ports: (d) =>
          idOf(d).toString().includes('ports')
            ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
            : [],
        badges: (d) =>
          idOf(d).toString().includes('badges')
            ? [
                { text: 'A', placement: 'right-top' },
                { text: 'Important', placement: 'right' },
                { text: 'Notice', placement: 'right-bottom' },
              ]
            : [],
        badgeFontSize: 8,
        badgePadding: [1, 4],
      },
    },
    // TODO fixme when animation is enabled
    animation: false,
    layout: {
      type: 'grid',
    },
    behaviors: ['drag-element'],
  });

  await graph.render();

  return graph;
};
