import { Graph } from '@/src';
import { idOf } from '@/src/utils/id';

export const elementNodeDonut: TestCase = async (context) => {
  const data = {
    nodes: [
      {
        id: 'donut',
        style: {
          donutInnerRadius: 0.8,
          donuts: [
            {
              id: 'round1',
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
          donuts: [{ innerRadius: 0.8 }, { innerRadius: 0.4 }],
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
              id: 'round1',
              value: 20,
            },
            {
              id: 'round2',
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
              id: 'round1',
              value: 1000,
            },
            {
              id: 'round2',
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
          donuts: [{ id: 'round1' }, { id: 'round2' }, { id: 'round3' }],
        },
      },
      {
        id: 'donut-inactive',
        style: {
          donuts: [
            {
              id: 'round1',
              fill: 'red',
            },
            {
              id: 'round2',
              fill: 'green',
            },
          ],
        },
      },
      {
        id: 'donut-disabled',
        style: {
          donuts: [
            {
              id: 'round1',
              color: 'green',
              innerRadius: 11,
            },
            {
              id: 'round2',
              color: 'red',
              innerRadius: -11,
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
