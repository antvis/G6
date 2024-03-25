import { Graph, GraphEvent } from '@antv/g6';

const data = {
  nodes: [
    { id: 'hexagon' },
    { id: 'hexagon-halo' },
    { id: 'hexagon-badges' },
    { id: 'hexagon-ports' },
    { id: 'hexagon-active' },
    { id: 'hexagon-selected' },
    { id: 'hexagon-highlight' },
    { id: 'hexagon-inactive' },
    { id: 'hexagon-disabled' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'hexagon', // 👈🏻 Node shape type.
      size: 40,
      labelText: (d) => d.id,
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
    'hexagon-active': 'active',
    'hexagon-selected': 'selected',
    'hexagon-highlight': 'highlight',
    'hexagon-inactive': 'inactive',
    'hexagon-disabled': 'disabled',
  });
});
