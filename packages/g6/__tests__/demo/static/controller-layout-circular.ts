import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import data from '@@/dataset/soccer.json';
import type { STDTestCase } from '../types';

export const controllerLayoutCircular: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    data,
    theme: 'light',
    layout: {
      type: 'circular',
      radius: 200,
    },
    node: { style: { size: 20 } },
    edge: {
      style: {
        type: 'line',
      },
    },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
