import { Graph, GraphEvent } from '@antv/g6';

const data = {
  nodes: [
    { id: 'donut' },
    { id: 'donut-halo' },
    { id: 'donut-badges' },
    { id: 'donut-ports' },
    { id: 'donut-active' },
    { id: 'donut-selected' },
    { id: 'donut-highlight' },
    { id: 'donut-inactive' },
    { id: 'donut-disabled' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'donut', // 👈🏻 Node shape type.
      size: 80,
      color: '#DB9D0D',
      innerRadius: 0.5,
      donuts: (v, index) => {
        if (index === 0) return [1, 2, 3];

        if (index === 1) {
          return [
            {
              value: 50,
              color: 'red',
            },
            {
              value: 150,
              color: 'green',
            },
            {
              value: 100,
              color: 'blue',
            },
          ];
        }

        if (index === 4) {
          return [
            {
              value: 150,
              fill: 'pink',
              stroke: '#fff',
              lineWidth: 1,
            },
            {
              value: 250,
              stroke: '#fff',
              lineWidth: 1,
            },
            {
              value: 200,
              stroke: '#fff',
              lineWidth: 1,
            },
          ];
        }

        return [100, 200, 100, 200];
      },
      labelText: (d) => d.id,
      iconHeight: 20,
      iconWidth: 20,
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      halo: (d) => d.id.includes('halo'),
      portR: 3,
      ports: (d) =>
        d.id.includes('ports')
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
      badges: (d) =>
        d.id.includes('badges')
          ? [
              { text: 'A', placement: 'right-top' },
              { text: 'Important', placement: 'right' },
              { text: 'Notice', placement: 'right-bottom' },
            ]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();

graph.on(GraphEvent.AFTER_RENDER, () => {
  graph.setElementState({
    'donut-active': 'active',
    'donut-selected': 'selected',
    'donut-highlight': 'highlight',
    'donut-inactive': 'inactive',
    'donut-disabled': 'disabled',
  });
});
