import type { G6Spec } from '../../../src';
import data from '../../dataset/soccer.json';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

export const controllerLayoutCircular: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    data,
    theme: 'light',
    layout: {
      type: 'circular',
      radius: 200,
      animation,
    },
    node: { style: { width: 20, height: 20 } },
    edge: {
      style: {
        type: 'line',
        // TODO polyline
      },
    },
  };

  const graph = createGraph(options, canvas);

  await graph.render();
};
