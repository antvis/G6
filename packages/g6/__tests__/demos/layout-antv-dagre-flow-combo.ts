import data from '@@/dataset/dagre-combo.json';
import { Graph } from '@antv/g6';

export const layoutAntVDagreFlowCombo: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    node: {
      type: 'rect',
      style: {
        size: [60, 30],
        radius: 8,
        labelText: (d) => d.id,
        labelPlacement: 'center',
        ports: [{ placement: 'top' }, { placement: 'bottom' }],
      },
      palette: {
        field: (d) => d.combo,
      },
    },
    edge: {
      type: 'cubic-vertical',
      style: {
        endArrow: true,
      },
    },
    combo: {
      type: 'rect',
      style: {
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
    behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas', 'collapse-expand'],
  });

  await graph.render();

  return graph;
};
