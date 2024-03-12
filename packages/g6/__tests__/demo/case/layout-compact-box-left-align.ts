import { Graph, Utils } from '@/src';
import data from '@@/dataset/algorithm-category.json';
import type { STDTestCase } from '../types';

type NodeData = {
  id: string;
};

export const layoutCompactBoxLeftAlign: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: Utils.treeToGraphData(data),
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    node: {
      style: {
        labelText: (data: NodeData) => data.id,
        labelPlacement: 'right',
        labelMaxWidth: 200,
        size: 12,
        lineWidth: 1,
        fill: '#fff',
        ports: [
          {
            placement: 'right',
          },
          {
            placement: 'left',
          },
        ],
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
        return d.id.length + 20;
      },
    },
    animation: false,
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
