import { Graph } from '@/src';
import data from '@@/dataset/circular.json';
import type { STDTestCase } from '../types';

export const layoutCircularDegree: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    edge: {
      style: {
        endArrow: true,
        endArrowType: 'vee',
      },
    },
    layout: {
      type: 'circular',
      ordering: 'degree',
    },
    behaviors: ['zoom-canvas', 'drag-canvas'],
  });

  await graph.render();

  return graph;
};
