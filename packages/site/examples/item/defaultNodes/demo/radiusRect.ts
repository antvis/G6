import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'rect' },
    { id: 'rect-halo' },
    { id: 'rect-badges' },
    { id: 'rect-ports' },
    { id: 'rect-active' },
    { id: 'rect-selected' },
    { id: 'rect-highlight' },
    { id: 'rect-inactive' },
    { id: 'rect-disabled' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'rect', // 👈🏻 Node shape type.
      radius: 4, // 👈🏻 Set the radius.
      size: 40,
      labelText: (d) => d.id,
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      iconWidth: 20,
      iconHeight: 20,
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
  graph.setElementState('rect-active', 'active');
  graph.setElementState('rect-selected', 'selected');
  graph.setElementState('rect-highlight', 'highlight');
  graph.setElementState('rect-inactive', 'inactive');
  graph.setElementState('rect-disabled', 'disabled');
});
