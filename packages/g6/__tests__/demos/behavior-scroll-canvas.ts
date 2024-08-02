import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const behaviorScrollCanvas: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'd3-force',
    },
    node: {
      style: {
        size: 20,
      },
    },
    behaviors: [
      {
        key: 'scroll-canvas',
        type: 'scroll-canvas',
      },
    ],
  });

  behaviorScrollCanvas.form = (panel) => {
    const config = {
      direction: '',
      sensitivity: 1,
    };

    panel.onChange(() => {
      graph.updateBehavior({
        key: 'scroll-canvas',
        ...config,
      });
    });

    return [panel.add(config, 'direction', ['xy', 'x', 'y']), panel.add(config, 'sensitivity', 1, 10, 1)];
  };

  await graph.render();

  return graph;
};
