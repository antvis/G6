import type { G6Spec } from '../../../src';
import data from '../../dataset/radial.json';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

export const controllerLayoutRadial: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    padding: 0,
    data: data,
    theme: 'light',
    layout: {
      type: 'radial',
      unitRadius: 50,
      animation,
    },
    node: { style: { width: 20, height: 20 } },
    edge: {
      style: {
        type: 'polyline',
      },
    },
  };

  const graph = createGraph(options, canvas);

  await graph.render();
};
