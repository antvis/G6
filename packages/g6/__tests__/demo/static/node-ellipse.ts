import { Graph } from '../../../src';
import type { StaticTestCase } from '../types';

export const nodeEllipse: StaticTestCase = async (context) => {
  const { canvas } = context;

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
    ],
  };

  const graph = new Graph({
    container: canvas,
    data,
    node: {
      style: {
        type: 'ellipse', // 👈🏻 Node shape type.
        width: 45,
        height: 35,
        fill: '#1783FF',
        labelText: (d) => d.id,
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        halo: (d) => d.id.includes('halo'),
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
          lineWidth: 2,
          stroke: '#000',
        },
        highlight: {
          halo: false,
          lineWidth: 2,
          stroke: '#000',
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

  graph.setElementState('ellipse-active', 'active');
  graph.setElementState('ellipse-selected', 'selected');
  graph.setElementState('ellipse-highlight', 'highlight');
  graph.setElementState('ellipse-inactive', 'inactive');
};
