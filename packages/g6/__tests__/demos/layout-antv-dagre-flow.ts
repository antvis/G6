import data from '@@/dataset/dagre.json';
import { Graph } from '@antv/g6';

export const layoutAntVDagreFlow: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    node: {
      type: 'rect',
      style: {
        size: [60, 30],
        radius: 8,
        labelFill: '#fff',
        labelPlacement: 'center',
        labelText: (d) => d.id,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        radius: 20,
        endArrow: true,
        lineWidth: 2,
        stroke: '#C2C8D5',
      },
    },
    layout: {
      type: 'antv-dagre',
    },
    behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
