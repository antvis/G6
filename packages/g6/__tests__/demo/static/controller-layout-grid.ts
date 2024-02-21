import type { G6Spec } from '../../../src';
import data from '../../dataset/soccer.json';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

export const controllerLayoutGrid: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    padding: 0,
    data,
    theme: 'light',
    layout: {
      type: 'grid',
      animation,
    },
    node: { style: { width: 20, height: 20 } },
  };

  const graph = createGraph(options, canvas);

  await graph.render();
};
