import { Graph } from '@antv/g6';

export const animationElementEdgeCubic: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 100 } },
        { id: 'node-2', style: { x: 350, y: 150 } },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
          style: {
            curveOffset: 30,
          },
        },
      ],
    },
    edge: {
      type: 'cubic',
      style: {
        lineWidth: 2,
        stroke: '#1890FF',
        labelText: 'cubic-edge',
        labelFontSize: 12,
        endArrow: true,
      },
    },
  });

  await graph.draw();

  animationElementEdgeCubic.form = (panel) => [
    panel.add(
      {
        Play: () => {
          graph.updateNodeData([{ id: 'node-2', style: { y: 300 } }]);
          graph.updateEdgeData([{ id: 'edge-1', style: { curveOffset: 60 } }]);
          graph.draw();
        },
      },
      'Play',
    ),
  ];

  return graph;
};
