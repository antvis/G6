import { Graph } from '@/src';
import data from '@@/dataset/combo.json';
import type { STDTestCase } from '../types';

type Item = {
  id: string;
  data: {
    size?: number;
    color?: string;
  };
};

export const layoutComboCombined: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'combo-combined',
      comboPadding: 2,
    },
    node: {
      style: {
        size: 20,
        labelText: (d: Item) => d.id,
      },
    },
    edge: {
      // @ts-expect-error
      style: (model: Item) => {
        const { size, color } = model.data;
        return { stroke: color || '#99ADD1', lineWidth: size || 1 };
      },
    },
    behaviors: ['drag-combo', 'drag-node', 'drag-canvas', 'zoom-canvas'],
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
