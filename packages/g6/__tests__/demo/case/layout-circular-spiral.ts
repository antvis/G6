import { Graph } from '@/src';
import data from '@@/dataset/circular.json';
import type { STDTestCase } from '../types';

export const layoutCircularSpiral: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'circular',
      startRadius: 10,
      endRadius: 300,
    },
    node: {
      style: {
        size: 20,
        labelText: (d: { id: string }) => d.id,
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
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
