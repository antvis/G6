import { Graph } from '@/src';
import data from '@@/dataset/soccer.json';
import type { STDTestCase } from '../types';

export const layout: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'd3force',
      preventOverlap: true,
      nodeSize: 20,
    },
  });

  await graph.render();

  return graph;
};
