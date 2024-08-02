import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const commonGraph: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        fill: (d) => (d.id === '33' ? '#d4414c' : '#2f363d'),
      },
    },
    layout: { type: 'd3-force' },
    behaviors: ['zoom-canvas', 'drag-canvas'],
    plugins: [],
  });

  await graph.render();

  return graph;
};
