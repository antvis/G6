import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';

export const behaviorScrollCanvas: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
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
      {
        type: 'scroll-canvas',
        // direction: 'x',
        // direction: 'y',
        // sensitivity: 5,
        // trigger: {
        //   up: ['ArrowUp'],
        //   down: ['ArrowDown'],
        //   right: ['ArrowRight'],
        //   left: ['ArrowLeft'],
        // },
      },
    ],
  });

  await graph.render();

  return graph;
};
