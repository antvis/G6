import { Graph } from '@/src';
import data from '@@/dataset/circular.json';

export const layoutCircularSpiral: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    edge: {
      style: {
        endArrow: true,
        endArrowType: 'vee',
      },
    },
    layout: {
      type: 'circular',
      startRadius: 10,
      endRadius: 300,
    },
    behaviors: ['zoom-canvas', 'drag-canvas'],
  });

  await graph.render();

  return graph;
};
