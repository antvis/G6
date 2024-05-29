import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const layoutFruchtermanCluster: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: { ...data, nodes: data.nodes.map((n) => ({ ...n, cluster: n.data.cluster })) },
    node: {
      style: {
        labelPlacement: 'center',
        labelText: (d) => d.id,
      },
      palette: {
        field: 'cluster',
      },
    },
    layout: {
      type: 'fruchterman',
      gravity: 5,
      speed: 5,
      clustering: true,
      nodeClusterBy: 'cluster',
    },
    behaviors: ['drag-canvas', 'drag-element'],
  });

  await graph.render();

  return graph;
};
