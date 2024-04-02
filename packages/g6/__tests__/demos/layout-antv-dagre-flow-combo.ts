import { Graph } from '@/src';
import data from '@@/dataset/dagre-combo.json';

export const layoutAntVDagreFlowCombo: TestCase = async (context) => {
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
        ports: [{ placement: 'top' }, { placement: 'bottom' }],
      },
      palette: {
        field: (d) => d.style?.parentId,
      },
    },
    edge: {
      style: {
        type: 'cubic-vertical',
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
      type: 'antv-dagre',
      ranksep: 50,
      nodesep: 5,
      sortByCombo: true,
    },
    behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
