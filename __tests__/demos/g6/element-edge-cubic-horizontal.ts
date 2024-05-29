import data from '@@/dataset/element-edges.json';
import { Graph } from '@antv/g6';

export const elementEdgeCubicHorizontal: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        port: true,
        ports: [{ placement: 'left' }, { placement: 'right' }],
      },
    },
    edge: {
      type: 'cubic-horizontal', // 👈🏻 Edge shape type.
      style: {
        labelText: (d) => d.id!,
        labelBackground: true,
        endArrow: true,
      },
    },
    layout: {
      type: 'antv-dagre',
      begin: [50, 50],
      rankdir: 'LR',
      nodesep: 30,
      ranksep: 150,
    },
  });

  await graph.render();

  return graph;
};
