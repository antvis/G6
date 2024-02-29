import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const nodeImage: StaticTestCase = async (context) => {
  const { container, animation, theme } = context;

  const data = {
    nodes: [
      { id: 'image' },
      { id: 'image-halo' },
      { id: 'image-badges' },
      { id: 'image-ports' },
      { id: 'image-active' },
      { id: 'image-selected' },
      { id: 'image-highlight' },
      { id: 'image-inactive' },
      { id: 'image-disabled' },
    ],
  };

  const graph = new Graph({
    container: container,
    theme,
    data,
    node: {
      style: {
        type: 'image', // 👈🏻 Node shape type.
        size: 40,
        labelMaxWidth: 120,
        labelText: (d: any) => d.id,
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        halo: (d: any) => d.id.includes('halo'),
        haloStroke: '#227eff',
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
      state: {
        disabled: {
          opacity: 0.2,
        },
      },
    },
    layout: {
      type: 'grid',
    },
    animation,
  });

  await graph.render();
  graph.setElementState('image-active', 'active');
  graph.setElementState('image-selected', 'selected');
  graph.setElementState('image-highlight', 'highlight');
  graph.setElementState('image-inactive', 'inactive');
  graph.setElementState('image-disabled', 'disabled');
};
