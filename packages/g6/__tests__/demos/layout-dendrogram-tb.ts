import { Graph, treeToGraphData } from '@/src';
import data from '@@/dataset/algorithm-category.json';

export const layoutDendrogramTb: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: treeToGraphData(data),
    node: {
      style: (model) => {
        const hasChildren = !!model.children?.length;
        return {
          labelMaxWidth: 200,
          labelPlacement: hasChildren ? 'right' : 'bottom',
          labelText: model.id,
          labelTextAlign: 'start',
          labelTextBaseline: hasChildren ? 'middle' : 'bottom',
          transform: hasChildren ? '' : 'rotate(90)',
          ports: [{ placement: 'bottom' }, { placement: 'top' }],
        };
      },
    },
    edge: {
      type: 'cubic-vertical',
    },
    layout: {
      type: 'dendrogram',
      direction: 'TB',
      nodeSep: 40,
      rankSep: 100,
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand-tree'],
  });

  await graph.render();

  return graph;
};
