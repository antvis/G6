import { Graph } from '@/src';
import { idOf } from '@/src/utils/id';
import type { StaticTestCase } from '../types';

export const nodeEllipse: StaticTestCase = async (context) => {
  const { container, animation, theme } = context;

  const data = {
    nodes: [
      { id: 'ellipse' },
      { id: 'ellipse-halo' },
      { id: 'ellipse-badges' },
      { id: 'ellipse-ports' },
      { id: 'ellipse-active' },
      { id: 'ellipse-selected' },
      { id: 'ellipse-highlight' },
      { id: 'ellipse-inactive' },
      { id: 'ellipse-disabled' },
    ],
  };

  const graph = new Graph({
    container: container,
    theme,
    data,
    node: {
      style: {
        type: 'ellipse', // 👈🏻 Node shape type.
        size: [45, 35],
        labelText: (d) => d.id!,
        iconHeight: 20,
        iconWidth: 20,
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        halo: (d) => idOf(d).toString().includes('halo'),
        portR: 3,
        ports: (d) =>
          idOf(d).toString().includes('ports')
            ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
            : [],
        badges: (d) =>
          idOf(d).toString().includes('badges')
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
    'ellipse-active': 'active',
    'ellipse-selected': 'selected',
    'ellipse-highlight': 'highlight',
    'ellipse-inactive': 'inactive',
    'ellipse-disabled': 'disabled',
  });
};
