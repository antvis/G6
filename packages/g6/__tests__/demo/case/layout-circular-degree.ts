import { Graph } from '@/src';
import data from '@@/dataset/circular.json';
import type { STDTestCase } from '../types';

export const layoutCircularDegree: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'circular',
      ordering: 'degree',
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
    behaviors: ['zoom-canvas', 'drag-canvas'],
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
