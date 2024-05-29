import data from '@@/dataset/element-edges.json';
import { Graph } from '@antv/g6';

export const elementEdgeCubicVertical: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        port: true,
        ports: [{ placement: 'top' }, { placement: 'bottom' }],
      },
    },
    edge: {
      type: 'cubic-vertical', // 👈🏻 Edge shape type.
      style: {
        labelText: (d) => d.id!,
        labelBackground: true,
        endArrow: true,
      },
    },
    layout: {
      type: 'antv-dagre',
      begin: [50, 50],
      rankdir: 'TB',
      nodesep: 25,
      ranksep: 150,
    },
  });

  await graph.render();

  return graph;
};
