import { Graph } from '@/src';
import data from '@@/dataset/combo.json';

export const layoutComboCombined: TestCase = async (context) => {
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
        labelText: (d) => d.id,
      },
    },
    edge: {
      style: (model) => {
        const { size, color } = model.data as { size: number; color: string };
        return { stroke: color || '#99ADD1', lineWidth: size || 1 };
      },
    },
    behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
