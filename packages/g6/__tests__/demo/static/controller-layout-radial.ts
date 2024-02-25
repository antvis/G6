import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import data from '@@/dataset/radial.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutRadial: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    container: canvas,
    animation,
    padding: 0,
    data: data,
    theme: 'light',
    layout: {
      type: 'radial',
      unitRadius: 50,
      animation,
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
};
