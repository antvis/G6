import { Graph } from '@/src';
import data from '@@/dataset/radial.json';
import type { STDTestCase } from '../types';

export const layoutRadialPreventOverlap: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d: { id: string }) => d.id,
        labelPlacement: 'center',
      },
    },
    edge: {
      style: {
        endArrow: true,
        endArrowType: 'vee',
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 50,
      preventOverlap: true,
      maxPreventOverlapIteration: 100,
    },
    behaviors: ['drag-canvas', 'drag-node'],
  });

  await graph.render();

  return graph;
};
