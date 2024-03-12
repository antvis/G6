import { Graph, Utils } from '@/src';
import data from '@@/dataset/algorithm-category.json';
import type { STDTestCase } from '../types';

export const topToBottomCompactBox: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: Utils.treeToGraphData(data),
    node: {
      style: {
        labelText: (data: { id: string }) => data.id,
        labelPlacement: 'right',
        labelMaxWidth: 200,
        transform: 'rotate(90deg)',
        size: 26,
        fill: '#EFF4FF',
        lineWidth: 1,
        stroke: '#5F95FF',
        ports: [
          {
            placement: 'bottom',
          },
          {
            placement: 'top',
          },
        ],
      },
    },
    edge: {
      style: {
        type: 'cubic-vertical',
      },
    },
    layout: {
      type: 'compact-box',
      direction: 'TB',
      getId: function getId(d: { id: string }) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 16;
      },
      getWidth: function getWidth() {
        return 16;
      },
      getVGap: function getVGap() {
        return 80;
      },
      getHGap: function getHGap() {
        return 20;
      },
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    animation: false,
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
