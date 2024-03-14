import { Graph } from '@/src';
import data from '@@/dataset/radial.json';
import type { STDTestCase } from '../types';

export const layoutRadialConfigurationTranslate: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'radial',
      unitRadius: 50,
    },
    node: {
      style: {
        labelText: (d: { id: string }) => d.id,
        labelPlacement: 'center',
        size: 20,
        fill: '#EFF4FF',
        lineWidth: 1,
        stroke: '#5F95FF',
      },
    },
    edge: {
      style: {
        endArrow: {
          path: 'M 0,0 L 8,4 L 8,-4 Z',
          fill: '#e2e2e2',
        },
      },
    },
    behaviors: ['drag-canvas', 'drag-node'],
    animation: true,
  });

  await graph.render();

  return graph;
};
