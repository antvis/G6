import type { G6Spec } from '../../../src';
import data from '../../dataset/soccer.json';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

export const controllerLayoutD3Force: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
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

  const graph = createGraph(options, canvas);

  await graph.render();
};
