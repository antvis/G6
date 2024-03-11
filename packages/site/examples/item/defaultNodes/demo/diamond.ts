import { Graph, GraphEvent } from '@antv/g6';

const data = {
  nodes: [
    { id: 'diamond' },
    { id: 'diamond-halo' },
    { id: 'diamond-badges' },
    { id: 'diamond-ports' },
    { id: 'diamond-active' },
    { id: 'diamond-selected' },
    { id: 'diamond-highlight' },
    { id: 'diamond-inactive' },
    { id: 'diamond-disabled' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'diamond',
      size: 40,
      labelMaxWidth: 120,
      labelText: (d) => d.id,
      iconWidth: 20,
      iconHeight: 20,
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      halo: (d) => d.id.includes('halo'),
      portR: 3,
      ports: (d) =>
        d.id.includes('ports')
          ? [{ position: 'left' }, { position: 'right' }, { position: 'top' }, { position: 'bottom' }]
          : [],
      badges: (d) =>
        d.id.includes('badges')
          ? [
              { text: 'A', position: 'right-top' },
              { text: 'Important', position: 'right' },
              { text: 'Notice', position: 'right-bottom' },
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
    'diamond-active': 'active',
    'diamond-selected': 'selected',
    'diamond-highlight': 'highlight',
    'diamond-inactive': 'inactive',
    'diamond-disabled': 'disabled',
  });
});
