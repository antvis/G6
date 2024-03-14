import { Graph } from '@/src';
import data from '@@/dataset/radial.json';
import type { STDTestCase } from '../types';

export const layoutRadialBasic: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'radial',
      unitRadius: 50,
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
    behaviors: ['drag-canvas', 'drag-node'],
  });

  await graph.render();

  return graph;
};
