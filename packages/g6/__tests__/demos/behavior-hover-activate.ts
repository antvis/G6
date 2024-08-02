import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const behaviorHoverActivate: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: data,
    layout: {
      type: 'd3-force',
      linkDistance: 150,
    },
    node: {
      style: {
        size: 20,
      },
    },
    zoomRange: [0.5, 5],
    behaviors: [{ type: 'hover-activate' }],
  });

  await graph.render();

  const config = {
    degree: 0,
  };

  behaviorHoverActivate.form = (panel) => [
    panel
      .add(config, 'degree', 0, 3, 1)
      .name('Degree')
      .onChange((degree: number) => graph.setBehaviors([{ type: 'hover-activate', degree }])),
  ];

  return graph;
};
