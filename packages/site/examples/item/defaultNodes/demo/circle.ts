import { Graph, GraphEvent } from '@antv/g6';

const data = {
  nodes: [
    { id: 'circle' },
    { id: 'circle-halo' },
    { id: 'circle-badges' },
    { id: 'circle-ports' },
    { id: 'circle-active' },
    { id: 'circle-selected' },
    { id: 'circle-highlight' },
    { id: 'circle-inactive' },
    { id: 'circle-disabled' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'circle', // 👈🏻 Node shape type.
      size: 40,
      labelMaxWidth: 120,
      labelText: (d) => d.id,
      iconHeight: 20,
      iconWidth: 20,
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      halo: (d) => d.id.includes('halo'),
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
  graph.setElementState('circle-active', 'active');
  graph.setElementState('circle-selected', 'selected');
  graph.setElementState('circle-highlight', 'highlight');
  graph.setElementState('circle-inactive', 'inactive');
  graph.setElementState('circle-disabled', 'disabled');
});
