import type { G6Spec } from '../../../src';
import data from '../../dataset/dagre.json';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

export const controllerLayoutDagre: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    data,
    theme: 'light',
    layout: {
      type: 'dagre',
      nodeSize: 10,
      ranksep: 20,
      controlPoints: true,
      begin: [20, 20],
      animation,
    },
    node: { style: { width: 20, height: 20 } },
    edge: {
      style: {
        type: 'polyline',
        // TODO polyline
      },
    },
  };

  const graph = createGraph(options, canvas);

  await graph.render();
};
