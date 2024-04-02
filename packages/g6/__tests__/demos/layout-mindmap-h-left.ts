import { Graph, Utils } from '@/src';
import data from '@@/dataset/algorithm-category.json';

export const layoutMindmapHLeft: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: Utils.treeToGraphData(data),
    autoFit: 'view',
    node: {
      style: (model) => {
        return {
          labelText: model.id,
          size: 26,
          labelPlacement: 'left',
          labelMaxWidth: 200,
          labelTextAlign: 'end',
          lineWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
          ports: [{ placement: 'right' }, { placement: 'left' }],
        };
      },
    },
    edge: {
      style: {
        type: 'cubic-horizontal',
      },
    },
    layout: {
      type: 'mindmap',
      direction: 'H',
      getHeight: () => {
        return 16;
      },
      getWidth: () => {
        return 16;
      },
      getVGap: () => {
        return 10;
      },
      getHGap: () => {
        return 100;
      },
      getSide: () => {
        return 'left';
      },
    },
    behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
