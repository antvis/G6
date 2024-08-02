import data from '@@/dataset/algorithm-category.json';
import type { NodeData } from '@antv/g6';
import { Graph, treeToGraphData } from '@antv/g6';

export const layoutMindmapHCustomSide: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: treeToGraphData(data),
    autoFit: 'view',
    node: {
      style: (model) => {
        const x = +model.style!.x!;
        return {
          labelText: model.id,
          size: 26,
          labelPlacement: x > 0 ? 'right' : 'left',
          labelMaxWidth: 200,
          labelTextAlign: x > 0 ? 'start' : 'end',
          lineWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
          ports: [{ placement: 'right' }, { placement: 'left' }],
        };
      },
    },
    edge: {
      type: 'cubic-horizontal',
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
        return 50;
      },
      getSide: (d: NodeData) => {
        if (d.id === 'Classification') {
          return 'left';
        }
        return 'right';
      },
    },
    behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
