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
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'star', // 👈🏻 Node shape type.
      width: 40,
      height: 40,
      fill: '#1783FF',
      labelText: (d) => d.id,
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      halo: (d) => d.id.includes('halo'),
      ports: (d) =>
        d.id.includes('ports')
          ? [{ position: 'left' }, { position: 'right' }, { position: 'top' }, { position: 'bottom' }]
          : [],
      portStroke: '#31d0c6',
      portFill: '#fff',
      portR: 2,
      portLineWidth: 1,
      badges: (d) =>
        d.id.includes('badges')
          ? [
              { text: 'A', position: 'right-top', backgroundFill: '#8291b2' },
              { text: 'Important', position: 'right', backgroundFill: '#e66c5b' },
              { text: 'Notice', position: 'right-bottom', backgroundFill: '#e5b95e' },
            ]
          : [],
      badgeFill: '#fff',
      badgeFontSize: 8,
      badgePadding: [1, 4],
    },
    state: {
      active: {
        halo: true,
      },
      selected: {
        halo: true,
        lineWidth: 2,
        stroke: '#000',
      },
      highlight: {
        halo: false,
        lineWidth: 2,
        stroke: '#000',
      },
      inactive: {
        opacity: 0.2,
      },
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
});
