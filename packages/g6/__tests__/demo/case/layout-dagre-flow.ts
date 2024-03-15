import { Graph } from '@/src';
import data from '@@/dataset/dagre.json';
import type { STDTestCase } from '../types';

export const layoutDagreFlow: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    node: {
      style: {
        type: 'rect',
        size: [60, 30],
        radius: 8,
        labelPlacement: 'center',
        labelText: (d: { id: string }) => d.id,
      },
    },
    edge: {
      style: {
        type: 'polyline',
        radius: 20,
        endArrow: true,
        lineWidth: 2,
        color: '#C2C8D5',
      },
    },
    layout: {
      type: 'dagre',
      nodesep: 100,
      ranksep: 70,
      controlPoints: true,
    },
    behaviors: ['drag-combo', 'drag-node', 'drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
