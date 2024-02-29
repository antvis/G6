import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import data from '@@/dataset/radial.json';
import type { STDTestCase } from '../types';

export const controllerLayoutRadial: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    padding: 0,
    data: data,
    theme: 'light',
    layout: {
      type: 'radial',
      unitRadius: 50,
    },
    node: { style: { size: 20 } },
    edge: {
      style: {
        type: 'polyline',
      },
    },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
