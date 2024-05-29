import data from '@@/dataset/circular.json';
import { Graph } from '@antv/g6';

export const layoutCircularConfigurationTranslate: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    edge: {
      style: {
        endArrow: true,
        endArrowType: 'vee',
      },
    },
    layout: {
      type: 'circular',
    },
    behaviors: ['drag-canvas', 'drag-element'],
  });

  await graph.render();

  return graph;
};
