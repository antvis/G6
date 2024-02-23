import { Graph } from '../../../src';
import type { StaticTestCase } from '../types';

export const nodeSphere: StaticTestCase = async ({ canvas, animation }) => {
  const data = {
    nodes: [
      { id: 'sphere' },
      { id: 'sphere-halo' },
      { id: 'sphere-badges' },
      { id: 'sphere-ports' },
      { id: 'sphere-active' },
      { id: 'sphere-selected' },
      { id: 'sphere-highlight' },
      { id: 'sphere-inactive' },
    ],
  };

  const graph = new Graph({
    container: canvas,
    data,
    node: {
      style: {
        type: 'sphere', // 👈🏻 Node shape type.
        size: 100,
        x: 100,
        y: 100,
        z: 100,
        fill: '#1783FF',
        labelText: (d) => d.id,
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
    animation,
  });

  await graph.render();

  graph.setElementState('sphere-active', 'active');
  graph.setElementState('sphere-selected', 'selected');
  graph.setElementState('sphere-highlight', 'highlight');
  graph.setElementState('sphere-inactive', 'inactive');
};
