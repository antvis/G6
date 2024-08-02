import data from '@@/dataset/algorithm-category.json';
import { Graph, treeToGraphData } from '@antv/g6';

export const layoutCompactBoxBasic: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: treeToGraphData(data),
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    node: {
      style: {
        labelText: (data) => data.id,
        labelPlacement: 'right',
        labelMaxWidth: 200,
        ports: [{ placement: 'right' }, { placement: 'left' }],
      },
    },
    edge: {
      type: 'cubic-horizontal',
    },
    layout: {
      type: 'compact-box',
      direction: 'LR',
      getHeight: function getHeight() {
        return 32;
      },
      getWidth: function getWidth() {
        return 32;
      },
      getVGap: function getVGap() {
        return 10;
      },
      getHGap: function getHGap() {
        return 100;
      },
    },
  });

  await graph.render();

  return graph;
};
