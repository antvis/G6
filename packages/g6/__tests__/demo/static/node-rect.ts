import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const nodeRect: StaticTestCase = async (context) => {
  const { canvas, animation, theme } = context;

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
      { id: 'rect-disable' },
    ],
  };

  const graph = new Graph({
    container: canvas,
    theme,
    data,
    node: {
      style: {
        type: 'rect', // 👈🏻 Node shape type.
        radius: 4, // 👈🏻 Set the radius.
        size: 40,
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
    animation,
  });

  await graph.render();

  graph.setElementState('rect-active', 'active');
  graph.setElementState('rect-selected', 'selected');
  graph.setElementState('rect-highlight', 'highlight');
  graph.setElementState('rect-inactive', 'inactive');
  graph.setElementState('rect-disable', 'disable');
};
