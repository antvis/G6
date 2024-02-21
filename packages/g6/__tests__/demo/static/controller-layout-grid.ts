import type { G6Spec } from '../../../src';
import { Graph } from '../../../src';
import data from '../../dataset/soccer.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutGrid: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    container: canvas,
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

  const graph = new Graph(options);

  await graph.render();
};
