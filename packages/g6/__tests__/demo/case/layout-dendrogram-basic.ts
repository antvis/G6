import { Graph, Utils } from '@/src';
import data from '@@/dataset/algorithm-category.json';
import type { STDTestCase } from '../types';

export const layoutDendrogramBasic: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: Utils.treeToGraphData(data),
    node: {
      style: {
        labelText: (d) => d.id,
        labelPlacement: (model) => (model.style!.children?.length ? 'left' : 'right'),
        ports: [{ placement: 'right' }, { placement: 'left' }],
      },
    },
    edge: {
      style: {
        type: 'cubic-horizontal',
      },
    },
    layout: {
      type: 'dendrogram',
      direction: 'LR',
      nodeSep: 36,
      rankSep: 250,
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node', 'collapse-expand-tree'],
  });

  await graph.render();

  return graph;
};
