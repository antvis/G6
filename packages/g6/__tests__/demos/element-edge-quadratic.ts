import data from '@@/dataset/element-edges.json';
import { Graph } from '@antv/g6';

export const elementEdgeQuadratic: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    edge: {
      type: 'quadratic', // 👈🏻 Edge shape type.
      style: {
        labelText: (d) => d.id!,
        labelBackground: true,
        endArrow: true,
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 220,
      linkDistance: 220,
    },
  });

  await graph.render();

  return graph;
};
