import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const behaviorDragCanvas: STDTestCase = async (context) => {
  const { canvas, animation } = context;
  const graph = new Graph({
    animation,
    container: canvas,
    data,
    layout: {
      type: 'd3force',
    },
    node: {
      style: {
        size: 20,
      },
    },
    behaviors: [
      'drag-canvas',
      {
        type: 'drag-canvas',
        trigger: {
          up: ['ArrowUp'],
          down: ['ArrowDown'],
          right: ['ArrowRight'],
          left: ['ArrowLeft'],
        },
      },
    ],
  });

  await graph.render();

  return graph;
};
