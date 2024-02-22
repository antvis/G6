// Change to import { Graph } from '@antv/g6'; if you are using npm
// todo: when test env, use SVG always.
import { Graph } from '../../../src';
import type { StaticTestCase } from '../types';

export const nodeImage: StaticTestCase = async (context) => {
  const { canvas } = context;

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
    ],
  };

  const graph = new Graph({
    container: canvas,
    data,
    node: {
      style: {
        type: 'image', // 👈🏻 Node shape type.
        width: 40,
        height: 40,
        labelText: (d) => d.id,
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        halo: (d) => d.id.includes('halo'),
        haloStroke: '#1783FF',
        ports: (d) =>
          d.id.includes('ports')
            ? [{ position: 'left' }, { position: 'right' }, { position: 'top' }, { position: 'bottom' }]
            : [],
        portStroke: '#31d0c6',
        portFill: '#fff',
        portR: 2,
        portLineWidth: 1,
        badges: (d) =>
          d.id.includes('badges')
            ? [
                { text: 'A', position: 'right-top', backgroundFill: '#8291b2' },
                { text: 'Important', position: 'right', backgroundFill: '#e66c5b' },
                { text: 'Notice', position: 'right-bottom', backgroundFill: '#e5b95e' },
              ]
            : [],
        badgeFill: '#fff',
        badgeFontSize: 8,
        badgePadding: [1, 4],
      },
      state: {
        active: {
          halo: true,
        },
        selected: {
          halo: true,
          labelFontWeight: 700,
          labelFontSize: 14,
        },
        highlight: {
          halo: false,
          labelFontWeight: 700,
        },
        inactive: {
          opacity: 0.2,
        },
      },
    },
    layout: {
      type: 'grid',
    },
    animation: false,
  });

  await graph.render();
  graph.setElementState('image-active', 'active');
  graph.setElementState('image-selected', 'selected');
  graph.setElementState('image-highlight', 'highlight');
  graph.setElementState('image-inactive', 'inactive');
};
