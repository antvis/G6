import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const nodeTriangle: StaticTestCase = async (context) => {
  const { container, animation, theme } = context;

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
    container: container,
    theme,
    data,
    node: {
      style: {
        type: 'triangle', // 👈🏻 Node shape type.
        size: 40,
        direction: (d: any) => d.data?.direction,
        labelText: (d: any) => d.id,
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        halo: (d: any) => d.id.includes('halo'),
        portR: 3,
        ports: (d: any) =>
          d.id.includes('ports') ? [{ placement: 'left' }, { placement: 'top' }, { placement: 'bottom' }] : [],
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
    'triangle-active': 'active',
    'triangle-selected': 'selected',
    'triangle-highlight': 'highlight',
    'triangle-inactive': 'inactive',
  });
};
