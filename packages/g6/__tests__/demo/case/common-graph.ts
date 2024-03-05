import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const commonGraph: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        fill: (d: any) => (d.id === '33' ? '#d4414c' : '#2f363d'),
      },
    },
    layout: { type: 'd3force' },
    behaviors: ['zoom-canvas', 'drag-canvas'],
    plugins: [],
  });

  await graph.render();

  return graph;
};
