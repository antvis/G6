import { Graph } from '@antv/g6';

const Icons = [
  'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
  'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
  'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png',
];

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
  ],
};

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 400,
  theme: 'light',
  data,
  layout: {
    type: 'grid',
  },
  node: {
    style: {
      type: 'circle',
      r: 20,
      labelText: (d) => d.id,
      iconSrc: (_, idx) => Icons[idx % Icons.length],
      halo: (d) => d.id.includes('halo'),
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
      }
    }
  }
});

graph.render();

graph.on('afterrender', () => {
  graph.setElementState('circle-active', 'active');
  graph.setElementState('circle-selected', 'selected');
  graph.setElementState('circle-highlight', 'highlight');
  graph.setElementState('circle-inactive', 'inactive');
});
