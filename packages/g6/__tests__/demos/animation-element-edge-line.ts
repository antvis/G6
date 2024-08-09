import { Graph } from '@antv/g6';

export const animationEdgeLine: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 150 } },
        { id: 'node-2', style: { x: 300, y: 200 } },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
    },
    cursor: 'grab',
    edge: {
      style: {
        lineWidth: 2,
        lineDash: [10, 10],
        stroke: '#1890FF',
        halo: true,
        haloOpacity: 0.25,
        haloLineWidth: 12,
        label: true,
        labelText: 'line-edge',
        labelFontSize: 12,
        labelFill: '#000',
        labelPadding: 0,
        startArrow: true,
        startArrowType: 'circle',
        endArrow: true,
        endArrowFill: 'red',
      },
    },
  });

  await graph.render();

  animationEdgeLine.form = (panel) => [
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
