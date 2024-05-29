import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const layoutFruchtermanBasic: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelPlacement: 'center',
        labelText: (d) => d.id,
      },
    },
    layout: {
      type: 'fruchterman',
      gravity: 5,
      speed: 5,
    },
    behaviors: ['drag-canvas', 'drag-element'],
  });

  await graph.render();

  return graph;
};
