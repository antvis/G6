import { Graph } from '@/src';
import { idOf } from '@/src/utils/id';

export const elementNodeDonut: TestCase = async (context) => {
  const data = {
    nodes: [
      {
        id: 'donut',
        style: {
          innerRadius: 0.6,
          donuts: [
            {
              color: 'red',
              stroke: 'green',
              lineWidth: 2,
            },
          ],
        },
      },
      {
        id: 'donut-halo',
        style: {
          donuts: [{ color: 'red' }, { color: 'green' }],
        },
      },
      {
        id: 'donut-badges',
        style: {
          donuts: [1, 2, 3],
        },
      },
      {
        id: 'donut-ports',
        style: {
          donuts: [1, 1, 1],
        },
      },
      {
        id: 'donut-active',
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
        id: 'donut-selected',
        style: {
          donuts: [
            {
              value: 1000,
            },
            {
              value: 20,
            },
          ],
        },
      },
      {
        id: 'donut-highlight',
        style: {
          donutLineWidth: 1,
          donutStroke: '#fff',
          donuts: [1, 2, 3],
        },
      },
      {
        id: 'donut-inactive',
        style: {
          innerRadius: 0,
          donuts: [
            {
              fill: 'red',
            },
            {
              fill: 'green',
            },
          ],
        },
      },
      {
        id: 'donut-disabled',
        style: {
          innerRadius: 1,
          donuts: [
            {
              color: 'green',
            },
            {
              color: 'red',
            },
          ],
        },
      },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        type: 'donut', // 👈🏻 Node shape type.
        size: 40,
        innerRadius: 0.5,
        labelText: (d) => d.id!,
        iconHeight: 20,
        iconWidth: 20,
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
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
    animation: false,
    layout: {
      type: 'grid',
    },
  });

  await graph.render();

  graph.setElementState({
    'donut-active': 'active',
    'donut-selected': 'selected',
    'donut-highlight': 'highlight',
    'donut-inactive': 'inactive',
    'donut-disabled': 'disabled',
  });

  return graph;
};
