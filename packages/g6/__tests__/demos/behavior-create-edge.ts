import { Graph } from '@/src';

export const behaviorCreateEdge: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node1', style: { x: 250, y: 150, parentId: 'combo1' } },
        { id: 'node2', style: { x: 350, y: 150, parentId: 'combo1' } },
        { id: 'node3', style: { x: 250, y: 300, parentId: 'combo2' } },
      ],
      edges: [],
      combos: [
        {
          id: 'combo1',
        },
        {
          id: 'combo2',
          style: {
            // 指向中心
            ports: [{ key: 'port-1', placement: [0.5, 0.5] }],
          },
        },
      ],
    },
    node: { style: { size: 20 } },
    edge: {
      style: { endArrow: true },
    },
    behaviors: [{ type: 'create-edge' }],
  });

  await graph.render();

  return graph;
};
