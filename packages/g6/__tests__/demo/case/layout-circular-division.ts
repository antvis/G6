import { Graph } from '@/src';
import data from '@@/dataset/circular.json';
import type { STDTestCase } from '../types';

export const layoutCircularDivision: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'circular',
      divisions: 5,
      radius: 200,
      startAngle: Math.PI / 4,
      endAngle: Math.PI,
    },
    node: {
      style: {
        size: 20,
        fill: '#EFF4FF',
        lineWidth: 1,
        stroke: '#5F95FF',
      },
    },
    edge: {
      style: {
        endArrow: {
          path: 'M 0,0 L 8,4 L 8,-4 Z',
          fill: '#e2e2e2',
        },
      },
    },
    behaviors: ['drag-canvas', 'drag-node'],
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
