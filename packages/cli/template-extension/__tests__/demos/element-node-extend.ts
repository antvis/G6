import { ExtendNode } from '@/src';
import { ExtensionCategory, Graph, register } from '@antv/g6';

export const elementNodeExtend: TestCase = async (context) => {
  register(ExtensionCategory.NODE, 'extend-node', ExtendNode);

  const graph = new Graph({
    ...context,
    data: {
      nodes: [{ id: 'node1', style: { x: 100, y: 100 } }],
    },
    node: { type: 'extend-node' },
  });

  await graph.render();

  return graph;
};
