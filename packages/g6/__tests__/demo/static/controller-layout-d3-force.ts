import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import data from '@@/dataset/soccer.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutD3Force: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    container: canvas,
    animation,
    data,
    theme: 'light',
    layout: {
      type: 'd3force',
      preventOverlap: true,
      nodeSize: 20,
      animation,
    },
    node: { style: { width: 20, height: 20 } },
  };

  const graph = new Graph(options);

  await graph.render();
};
