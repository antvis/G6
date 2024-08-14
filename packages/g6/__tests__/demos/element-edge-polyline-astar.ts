import { Graph } from '@antv/g6';

export const elementEdgePolylineAstar: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 100 } },
        { id: 'node-2', style: { x: 200, y: 200 } },
        { id: 'node-3', style: { x: 150, y: 150 } },
      ],
      edges: [{ source: 'node-1', target: 'node-2' }],
    },
    node: {
      type: 'rect',
      style: {
        size: 40,
        fill: 'transparent',
        stroke: '#1783FF',
        lineWidth: 1,
        // ports: [{ id: 'port-1', placement: [1, 0.2], r: 2, fill: '#31d0c6' }],
      },
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 1,
        router: {
          type: 'shortest-path',
          offset: 0,
          enableObstacleAvoidance: false,
          startDirections: ['top', 'right', 'bottom', 'left'],
          endDirections: ['top', 'right', 'bottom', 'left'],
        },
      },
    },
    behaviors: ['drag-element'],
  });

  await graph.render();

  return graph;
};
