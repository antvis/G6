import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const nodeTriangle: StaticTestCase = async (context) => {
  const { canvas, animation, theme } = context;

  const data = {
    nodes: [
      { id: 'triangle' },
      { id: 'triangle-halo' },
      { id: 'triangle-badges' },
      { id: 'triangle-ports', data: { direction: 'left' } },
      { id: 'triangle-active' },
      { id: 'triangle-selected' },
      { id: 'triangle-highlight' },
      { id: 'triangle-inactive' },
    ],
  };

  const graph = new Graph({
    container: canvas,
    theme,
    data,
    node: {
      style: {
        type: 'triangle', // 👈🏻 Node shape type.
        size: 40,
        direction: (d: any) => d.data?.direction,
        labelMaxWidth: 120,
        labelText: (d: any) => d.id,
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        halo: (d: any) => d.id.includes('halo'),
        ports: (d: any) =>
          d.id.includes('ports') ? [{ position: 'left' }, { position: 'top' }, { position: 'bottom' }] : [],
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
  graph.setElementState('triangle-active', 'active');
  graph.setElementState('triangle-selected', 'selected');
  graph.setElementState('triangle-highlight', 'highlight');
  graph.setElementState('triangle-inactive', 'inactive');
};
