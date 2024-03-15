import { Graph } from '@/src';
import data from '@@/dataset/circular.json';
import type { STDTestCase } from '../types';

export const layoutCircularBasic: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    layout: {
      type: 'circular',
    },
    behaviors: ['zoom-canvas', 'drag-canvas'],
  });

  await graph.render();

  return graph;
};
