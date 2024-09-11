import data from '@@/dataset/algorithm-category.json';
import { Graph, treeToGraphData } from '@antv/g6';

export const transformPlaceRadialLabels: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: treeToGraphData(data),
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    layout: [
      {
        type: 'dendrogram',
        radial: true,
        nodeSep: 30,
        rankSep: 200,
      },
    ],
    transforms: ['place-radial-labels'],
  });

  await graph.render();

  return graph;
};
