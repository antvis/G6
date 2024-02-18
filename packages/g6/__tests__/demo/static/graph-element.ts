import { Graph } from '../../../src';
import data from '../../dataset/cluster.json';
import type { StaticTestCase } from '../types';

export const graphElement: StaticTestCase = async (context) => {
  const { canvas, animation } = context;

  const graph = new Graph({
    container: canvas,
    data,
    theme: 'light',
    node: {
      style: {
        width: 20,
        height: 20,
      },
      state: {
        active: { fill: '#dbedd0' },
      },
      animation: animation && {},
    },
    edge: {
      style: {},
      state: {
        active: { stroke: 'pink', lineWidth: 3 },
      },
      animation: animation && {},
    },
    layout: {
      type: 'd3force',
      preventOverlap: true,
      nodeSize: 20,
      animation,
    },
  });

  await graph.render();
};
