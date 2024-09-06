import { Graph } from '@antv/g6';

export const elementEdgePolylineOrth: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: '0' },
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
        { id: '9' },
      ],
      edges: [
        { source: '0', target: '1' },
        { source: '0', target: '2' },
        { source: '1', target: '4' },
        { source: '0', target: '3' },
        { source: '3', target: '4' },
        { source: '4', target: '5' },
        { source: '4', target: '6' },
        { source: '5', target: '7' },
        { source: '5', target: '8' },
        { source: '8', target: '9' },
        { source: '2', target: '9' },
        { source: '3', target: '9' },
      ],
    },
    layout: {
      type: 'antv-dagre',
      nodesep: 50,
      ranksep: 20,
    },
    autoFit: 'view',
    node: {
      type: 'rect',
      style: {
        size: [60, 30],
        radius: 8,
        ports: [{ placement: 'top' }, { placement: 'bottom' }],
      },
    },
    edge: {
      type: 'polyline',
      style: {
        endArrow: true,
        endArrowSize: 8,
        lineWidth: 2,
        radius: 10,
        router: {
          type: 'orth',
        },
      },
    },
    animation: false,
    behaviors: ['drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
