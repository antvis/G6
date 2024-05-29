import data from '@@/dataset/radial.json';
import { Graph } from '@antv/g6';

export const layoutRadialSort: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d) => d.id,
        labelPlacement: 'center',
      },
    },
    edge: {
      style: {
        endArrow: true,
        endArrowType: 'vee',
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 70,
      maxIteration: 1000,
      linkDistance: 10,
      preventOverlap: true,
      nodeSize: 30,
      sortBy: 'sortAttr2',
      sortStrength: 50,
    },
    behaviors: ['drag-canvas', 'drag-element'],
  });

  await graph.render();

  return graph;
};
