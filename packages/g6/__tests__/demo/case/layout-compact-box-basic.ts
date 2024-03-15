import { Graph, Utils } from '@/src';
import data from '@@/dataset/algorithm-category.json';
import type { STDTestCase } from '../types';

export const layoutCompactBoxBasic: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: Utils.treeToGraphData(data),
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    node: {
      style: {
        labelText: (data) => data.id,
        labelPlacement: 'right',
        labelMaxWidth: 200,
        ports: [{ placement: 'right' }, { placement: 'left' }],
      },
    },
    edge: {
      style: {
        type: 'cubic-horizontal',
      },
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
    animation: false,
  });

  await graph.render();

  return graph;
};
