import { Graph } from '@antv/g6';

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
      width: 40,
      height: 40,
      labelMaxWidth: 120,
      labelText: (d: any) => d.id,
      iconWidth: 20,
      iconHeight: 20,
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      halo: (d: any) => d.id.includes('halo'),
      ports: (d: any) =>
        d.id.includes('ports')
          ? [{ position: 'left' }, { position: 'right' }, { position: 'top' }, { position: 'bottom' }]
          : [],
      badges: (d: any) =>
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
await graph.render();
graph.setElementState('diamond-active', 'active');
graph.setElementState('diamond-selected', 'selected');
graph.setElementState('diamond-highlight', 'highlight');
graph.setElementState('diamond-inactive', 'inactive');
graph.setElementState('diamond-disabled', 'disabled');
