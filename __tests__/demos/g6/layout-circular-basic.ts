import data from '@@/dataset/circular.json';
import { Graph } from '@antv/g6';

export const layoutCircularBasic: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    layout: {
      type: 'circular',
    },
    behaviors: ['zoom-canvas', 'drag-canvas'],
  });

  await graph.render();

  return graph;
};
