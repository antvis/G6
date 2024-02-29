import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const commonGraph: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: { type: 'd3force' },
    behaviors: [],
    widgets: [],
  });

  await graph.render();

  return graph;
};
