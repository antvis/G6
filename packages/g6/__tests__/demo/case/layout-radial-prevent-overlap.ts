import { Graph } from '@/src';
import data from '@@/dataset/radial.json';
import type { STDTestCase } from '../types';

export const layoutRadialPreventOverlap: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'radial',
      unitRadius: 50,
      preventOverlap: true,
      maxPreventOverlapIteration: 100,
    },
    node: {
      style: {
        labelText: (d) => d.id,
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
  });

  await graph.render();

  return graph;
};
