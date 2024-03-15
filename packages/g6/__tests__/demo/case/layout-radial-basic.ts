import { Graph } from '@/src';
import data from '@@/dataset/radial.json';
import type { STDTestCase } from '../types';

export const layoutRadialBasic: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d: { id: string }) => d.id,
        labelPlacement: 'center',
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 50,
    },
    behaviors: ['drag-canvas', 'drag-node'],
  });

  await graph.render();

  return graph;
};
