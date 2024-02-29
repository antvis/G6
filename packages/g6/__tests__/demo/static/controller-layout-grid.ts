import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import data from '@@/dataset/soccer.json';
import type { STDTestCase } from '../types';

export const controllerLayoutGrid: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    padding: 0,
    data,
    theme: 'light',
    layout: {
      type: 'grid',
    },
    node: { style: { size: 20 } },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
