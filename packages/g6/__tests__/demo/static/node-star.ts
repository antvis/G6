import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const nodeStar: StaticTestCase = async (context) => {
  const { canvas, animation, theme } = context;

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
    container: canvas,
    theme,
    data,
    node: {
      style: {
        type: 'star', // 👈🏻 Node shape type.
        size: 40,
        labelMaxWidth: 120,
        labelText: (d: any) => d.id,
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
    animation,
  });

  await graph.render();

  graph.setElementState('star-active', 'active');
  graph.setElementState('star-selected', 'selected');
  graph.setElementState('star-highlight', 'highlight');
  graph.setElementState('star-inactive', 'inactive');
  graph.setElementState('star-disable', 'disable');
};
