import { Graph } from '@antv/g6';

export const elementEdgePolylineAstar: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 100 } },
        { id: 'node-2', style: { x: 100, y: 200 } },
        { id: 'node-3', style: { x: 100, y: 150 } },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
          style: {
            router: {
              type: 'shortest-path',
              offset: 0,
              enableObstacleAvoidance: true,
            },
          },
        },
      ],
    },
    node: {
      type: 'rect',
      style: {
        size: 25,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 1,
      },
    },
    behaviors: ['drag-element'],
  });

  await graph.render();

  return graph;
};
