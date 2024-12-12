import data from '@@/dataset/algorithm-category.json';
import { Graph, treeToGraphData } from '@antv/g6';

export const elementEdgeCubicRadial: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: treeToGraphData(data),
    edge: {
      type: 'cubic-radial',
    },
    layout: {
      type: 'dendrogram',
      radial: true,
      nodeSep: 30,
      rankSep: 200,
      preLayout: true,
    },
  });

  await graph.render();

  return graph;
};
