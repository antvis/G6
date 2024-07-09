import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';

export const behaviorDragCanvas: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'd3-force',
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
        key: 'drag-canvas',
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
