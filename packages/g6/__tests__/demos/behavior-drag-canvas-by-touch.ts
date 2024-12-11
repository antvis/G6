import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const behaviorDragCanvasByTouch: TestCase = async (context) => {
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
    behaviors: [{ key: 'drag-canvas-by-touch', type: 'drag-canvas-by-touch' }],
  });

  await graph.render();

  return graph;
};
