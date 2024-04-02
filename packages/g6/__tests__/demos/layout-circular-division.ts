import { Graph } from '@/src';
import data from '@@/dataset/circular.json';

export const layoutCircularDivision: TestCase = async (context) => {
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
      divisions: 5,
      radius: 200,
      startAngle: Math.PI / 4,
      endAngle: Math.PI,
    },
    behaviors: ['zoom-canvas', 'drag-canvas'],
  });

  await graph.render();

  return graph;
};
