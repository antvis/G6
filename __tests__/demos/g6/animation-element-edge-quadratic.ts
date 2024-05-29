import { Graph } from '@antv/g6';

export const animationElementEdgeQuadratic: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 150 } },
        { id: 'node-2', style: { x: 300, y: 200 } },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
        },
      ],
    },
    edge: {
      type: 'quadratic',
      style: {
        lineWidth: 2,
        stroke: '#1890FF',
        labelText: 'quadratic-edge',
        labelFontSize: 12,
        endArrow: true,
      },
    },
  });

  await graph.draw();

  animationElementEdgeQuadratic.form = (panel) => [
    panel.add(
      {
        Play: () => {
          graph.updateNodeData([{ id: 'node-2', style: { x: 450, y: 350 } }]);
          graph.draw();
        },
      },
      'Play',
    ),
  ];

  return graph;
};
