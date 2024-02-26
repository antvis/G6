import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'star' },
    { id: 'star-halo' },
    { id: 'star-badges' },
    { id: 'star-ports' },
    { id: 'star-active' },
    { id: 'star-selected' },
    { id: 'star-highlight' },
    { id: 'star-inactive' },
    { id: 'star-disable' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'star', // 👈🏻 Node shape type.
      size: 40,
      labelText: (d) => d.id,
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
      badgeFontSize: 8,
      badgePadding: [1, 4],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();

graph.on('afterrender', () => {
  graph.setElementState('star-active', 'active');
  graph.setElementState('star-selected', 'selected');
  graph.setElementState('star-highlight', 'highlight');
  graph.setElementState('star-inactive', 'inactive');
  graph.setElementState('star-disable', 'disable');
});
