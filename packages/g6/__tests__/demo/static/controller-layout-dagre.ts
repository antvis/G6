import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import data from '@@/dataset/dagre.json';
import type { STDTestCase } from '../types';

export const controllerLayoutDagre: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    data,
    theme: 'light',
    layout: {
      type: 'dagre',
      nodeSize: 10,
      ranksep: 20,
      controlPoints: true,
      begin: [20, 20],
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
