import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const controllerLayoutForce: STDTestCase = async (context) => {
  const colors = { a: '#cd2f3b', b: '#005cc5', c: '#1e7834', d: '#ff9f45' };
  const options: G6Spec = {
    ...context,
    data,
    theme: 'light',
    layout: {
      type: 'force',
      linkDistance: 50,
      clustering: true,
      dimensions: 2,
      nodeClusterBy: 'cluster',
      clusterNodeStrength: 100,
    },
    node: {
      style: {
        size: 20,
        lineWidth: 0,
        fill: (data) => colors[data.style!.cluster as keyof typeof colors],
      },
    },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};

controllerLayoutForce.skip = true;
