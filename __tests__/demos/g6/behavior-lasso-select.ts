import { Graph } from '@antv/g6';

export const behaviorLassoSelect: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1', style: { x: 150, y: 250, lineWidth: 0 } },
        { id: 'node2', combo: 'combo1', style: { x: 250, y: 200, lineWidth: 0 } },
        { id: 'node3', combo: 'combo1', style: { x: 350, y: 250, lineWidth: 0 } },
        { id: 'node4', combo: 'combo1', style: { x: 250, y: 300, lineWidth: 0 } },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
        },
        {
          id: 'edge2',
          source: 'node2',
          target: 'node3',
        },
        {
          id: 'edge3',
          source: 'node3',
          target: 'node4',
        },
        {
          id: 'edge4',
          source: 'node1',
          target: 'node4',
        },
      ],
      combos: [{ id: 'combo1' }],
    },
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    animation: false,
    behaviors: [{ type: 'lasso-select', key: 'lasso-select', trigger: 'drag' }],
  });

  await graph.render();

  return graph;
};
