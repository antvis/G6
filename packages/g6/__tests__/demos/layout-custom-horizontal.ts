import { BaseLayout, ExtensionCategory, Graph, idOf, register } from '@antv/g6';

import type { BaseLayoutOptions, GraphData, NodeData } from '@antv/g6';

interface CustomLayoutOptions extends BaseLayoutOptions {
  gap?: number;
  nodeSize: (node: NodeData) => number;
  center: [number, number];
}

class CustomLayout extends BaseLayout<CustomLayoutOptions> {
  id = 'custom-layout';

  async execute(data: GraphData): Promise<GraphData> {
    const { nodes = [] } = data;
    const { nodeSize, gap = 10 } = this.options;
    return {
      nodes: nodes.map((node, index) => {
        const size = nodeSize(node);
        return {
          id: idOf(node),
          style: {
            x: index * (size + gap) + size / 2,
            y: 100,
          },
        };
      }),
    };
  }
}

export const layoutCustomHorizontal: TestCase = async (context) => {
  register(ExtensionCategory.LAYOUT, 'custom-layout', CustomLayout);

  const graph = new Graph({
    ...context,
    autoFit: 'center',
    data: {
      nodes: Array.from({ length: 10 }).map((_, i) => ({ id: i })),
    },
    layout: {
      type: 'custom-layout',
      gap: 10,
    },
  });

  await graph.render();

  return graph;
};
