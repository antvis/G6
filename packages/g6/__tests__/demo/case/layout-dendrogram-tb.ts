import { Graph, Utils } from '@/src';
import data from '@@/dataset/algorithm-category.json';
import type { STDTestCase } from '../types';

export const layoutDendrogramTb: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: Utils.treeToGraphData(data),
    node: {
      style: (model) => {
        const hasChildren = !!model.style!.children?.length;
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
      style: {
        type: 'cubic-vertical',
      },
    },
    layout: {
      type: 'dendrogram',
      direction: 'TB',
      nodeSep: 40,
      rankSep: 100,
    },
    autoFit: 'view',
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node', 'collapse-expand-tree'],
  });

  await graph.render();

  return graph;
};
