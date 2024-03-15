import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const layoutFruchtermanBasic: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelPlacement: 'center',
        labelText: (d) => d.id,
      },
    },
    layout: {
      type: 'fruchterman',
      gravity: 5,
      speed: 5,
    },
    behaviors: ['drag-canvas', 'drag-node'],
  });

  await graph.render();

  return graph;
};
