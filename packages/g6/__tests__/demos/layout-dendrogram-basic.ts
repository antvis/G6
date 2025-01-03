import data from '@@/dataset/algorithm-category.json';
import { Graph, treeToGraphData } from '@antv/g6';

export const layoutDendrogramBasic: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: treeToGraphData(data),
    node: {
      style: {
        labelText: (d) => d.id,
        labelPlacement: (model) => (model.children?.length ? 'left' : 'right'),
        ports: [{ placement: 'right' }, { placement: 'left' }],
      },
    },
    edge: {
      type: 'cubic-horizontal',
    },
    layout: {
      type: 'dendrogram',
      direction: 'LR',
      nodeSep: 36,
      rankSep: 250,
      preLayout: true,
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
  });

  await graph.render();

  return graph;
};
