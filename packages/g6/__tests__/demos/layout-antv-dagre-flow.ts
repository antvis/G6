import { Graph } from '@/src';
import data from '@@/dataset/dagre.json';

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
        color: '#C2C8D5',
      },
    },
    layout: {
      type: 'antv-dagre',
      nodesep: 100,
      ranksep: 70,
      controlPoints: true,
    },
    behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
