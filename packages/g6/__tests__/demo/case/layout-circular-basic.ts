import { Graph } from '@/src';
import data from '@@/dataset/circular.json';
import type { STDTestCase } from '../types';

export const layoutCircularBasic: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'circular',
    },
    node: {
      style: {
        size: 20,
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
