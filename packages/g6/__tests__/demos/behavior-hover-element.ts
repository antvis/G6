import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';

export const behaviorHoverElement: TestCase = async (context) => {
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
    behaviors: [{ type: 'hover-element' }],
  });

  await graph.render();

  const config = {
    degree: 0,
  };

  behaviorHoverElement.form = (panel) => [
    panel
      .add(config, 'degree', 0, 3, 1)
      .name('Degree')
      .onChange((degree: number) => graph.setBehaviors([{ type: 'hover-element', degree }])),
  ];

  return graph;
};
