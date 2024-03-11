import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const nodeRect: StaticTestCase = async (context) => {
  const { container, animation, theme } = context;

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
    container: container,
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
        portR: 3,
        ports: (d: any) =>
          d.id.includes('ports')
            ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
            : [],
        badges: (d: any) =>
          d.id.includes('badges')
            ? [
                { text: 'A', placement: 'right-top' },
                { text: 'Important', placement: 'right' },
                { text: 'Notice', placement: 'right-bottom' },
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
  graph.setElementState('rect-disabled', 'disabled');
};
