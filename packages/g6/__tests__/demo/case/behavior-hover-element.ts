import { Graph } from '@/src';
import data from '@@/dataset/dagre.json';
import type { STDTestCase } from '../types';

export const behaviorHoverElement: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: data,
    layout: {
      type: 'fruchterman',
      gravity: 5,
      speed: 5,
    },
    node: {
      style: {
        size: 20,
      },
    },
    zoomRange: [0.5, 5],
    behaviors: [{ type: 'hover-element' }],
  });

  await graph.render();

  return graph;
};
