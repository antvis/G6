import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';

export const behaviorHoverElement: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: data,
    layout: {
      type: 'd3force',
      linkDistance: 150,
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
