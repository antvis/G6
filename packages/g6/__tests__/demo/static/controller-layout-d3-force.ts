import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import data from '@@/dataset/soccer.json';
import type { STDTestCase } from '../types';

export const controllerLayoutD3Force: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    data,
    theme: 'light',
    layout: {
      type: 'd3force',
      preventOverlap: true,
      nodeSize: 20,
    },
    node: { style: { size: 20 } },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
