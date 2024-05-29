import data from '@@/dataset/relations.json';
import { Graph } from '@antv/g6';

export const layoutFruchtermanFix: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'fruchterman',
      speed: 10,
      maxIteration: 500,
    },
    behaviors: ['drag-canvas', 'drag-element'],
  });

  graph.on('node:dragstart', function () {
    graph.stopLayout();
  });

  graph.on('node:dragend', function () {
    // FIXME: 不应该完全重新布局，而是以当前画布数据进行布局
    graph.layout();
  });

  await graph.render();

  return graph;
};
