import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const nodeDiamond: StaticTestCase = async (context) => {
  const { container, animation, theme } = context;
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
    container: container,
    theme,
    data,
    node: {
      style: {
        type: 'diamond', // 👈🏻 Node shape type.
        width: 40,
        height: 40,
        labelMaxWidth: 120,
        labelText: (d) => d.id,
        iconWidth: 20,
        iconHeight: 20,
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
    animation,
  });
  await graph.render();
  graph.setElementState('diamond-active', 'active');
  graph.setElementState('diamond-selected', 'selected');
  graph.setElementState('diamond-highlight', 'highlight');
  graph.setElementState('diamond-inactive', 'inactive');
  graph.setElementState('diamond-disabled', 'disabled');
};
