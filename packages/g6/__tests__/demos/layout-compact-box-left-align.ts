import data from '@@/dataset/algorithm-category.json';
import type { NodeData } from '@antv/g6';
import { Graph, treeToGraphData } from '@antv/g6';

export const layoutCompactBoxTopToBottom: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: treeToGraphData(data),
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    node: {
      style: {
        labelText: (data) => data.id,
        labelPlacement: 'right',
        labelMaxWidth: 200,
        size: 12,
        lineWidth: 1,
        fill: '#fff',
        ports: [{ placement: 'right' }, { placement: 'left' }],
      },
    },
    edge: {
      type: 'cubic-horizontal',
    },
    layout: {
      type: 'compact-box',
      direction: 'LR',
      getId: function getId(d: NodeData) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 16;
      },
      getVGap: function getVGap() {
        return 10;
      },
      getHGap: function getHGap() {
        return 100;
      },
      getWidth: function getWidth(d: NodeData) {
        return d.id.toString().length + 20;
      },
    },
    animation: false,
  });

  await graph.render();

  return graph;
};
