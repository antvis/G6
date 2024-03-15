import { Graph } from '@/src';
import data from '@@/dataset/dagre-combo.json';
import type { STDTestCase } from '../types';

export const layoutDagreFlowCombo: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    node: {
      style: {
        type: 'rect',
        size: [60, 30],
        radius: 8,
        labelText: (d) => d.id,
        labelPlacement: 'center',
      },
      palette: {
        field: (d) => d.style?.parentId,
      },
    },
    edge: {
      style: {
        type: 'polyline',
        endArrow: true,
      },
    },
    combo: {
      style: {
        type: 'rect',
        radius: 8,
        labelText: (d) => d.id,
        lineDash: 0,
        collapsedLineDash: [5, 5],
      },
    },
    layout: {
      type: 'dagre',
      ranksep: 50,
      nodesep: 5,
    },
    behaviors: ['drag-combo', 'drag-node', 'drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
