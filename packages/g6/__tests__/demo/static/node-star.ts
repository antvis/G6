import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const nodeStar: StaticTestCase = async (context) => {
  const { container, animation, theme } = context;

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
      { id: 'star-disabled' },
    ],
  };

  const graph = new Graph({
    container: container,
    theme,
    data,
    node: {
      style: {
        type: 'star', // 👈🏻 Node shape type.
        size: 40,
        labelText: (d: any) => d.id,
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

  graph.setElementState({
    'star-active': 'active',
    'star-selected': 'selected',
    'star-highlight': 'highlight',
    'star-inactive': 'inactive',
    'star-disabled': 'disabled',
  });
};
