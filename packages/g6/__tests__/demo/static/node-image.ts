import { Graph } from '@/src';
import { idOf } from '@/src/utils/id';
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
        labelText: (d) => d.id!,
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        halo: (d) => idOf(d).toString().includes('halo'),
        haloStroke: '#227eff',
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

  graph.setElementState({
    'image-active': 'active',
    'image-selected': 'selected',
    'image-highlight': 'highlight',
    'image-inactive': 'inactive',
    'image-disabled': 'disabled',
  });
};
