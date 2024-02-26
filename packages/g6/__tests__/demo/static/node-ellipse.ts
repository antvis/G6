import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const nodeEllipse: StaticTestCase = async (context) => {
  const { canvas, animation, theme } = context;

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
      { id: 'ellipse-disable' },
    ],
  };

  const graph = new Graph({
    container: canvas,
    theme,
    data,
    node: {
      style: {
        type: 'ellipse', // 👈🏻 Node shape type.
        size: [45, 35],
        labelMaxWidth: 120,
        labelText: (d: any) => d.id,
        iconHeight: 20,
        iconWidth: 20,
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

  graph.setElementState('ellipse-active', 'active');
  graph.setElementState('ellipse-selected', 'selected');
  graph.setElementState('ellipse-highlight', 'highlight');
  graph.setElementState('ellipse-inactive', 'inactive');
  graph.setElementState('ellipse-disable', 'disable');
};
