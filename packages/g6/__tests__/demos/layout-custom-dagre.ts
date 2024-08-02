import { layoutAdapter } from '@/src/utils/layout';
import type { BaseLayoutOptions, GraphData, NodeData } from '@antv/g6';
import { BaseLayout, DagreLayout, ExtensionCategory, Graph, register } from '@antv/g6';

interface CustomLayoutOptions extends BaseLayoutOptions {
  gap?: number;
  nodeSize: (node: NodeData) => number;
  center: [number, number];
}

class CustomLayout extends BaseLayout<CustomLayoutOptions> {
  id = 'custom-layout';

  async execute(data: GraphData): Promise<GraphData> {
    const AdaptiveDagreLayout = layoutAdapter(DagreLayout, this.context);
    const layout = new AdaptiveDagreLayout(this.context, this.options);
    const model = await layout.execute(data);
    return model;
  }
}

export const layoutCustomDagre: TestCase = async (context) => {
  register(ExtensionCategory.LAYOUT, 'custom-layout', CustomLayout);

  const data = {
    nodes: [
      { id: 'kspacey', data: { label: 'Kevin Spacey', width: 144, height: 100 } },
      { id: 'swilliams', data: { label: 'Saul Williams', width: 160, height: 100 } },
      { id: 'bpitt', data: { label: 'Brad Pitt', width: 108, height: 100 } },
      { id: 'hford', data: { label: 'Harrison Ford', width: 168, height: 100 } },
      { id: 'lwilson', data: { label: 'Luke Wilson', width: 144, height: 100 } },
      { id: 'kbacon', data: { label: 'Kevin Bacon', width: 121, height: 100 } },
    ],
    edges: [
      { id: 'kspacey->swilliams', source: 'kspacey', target: 'swilliams' },
      { id: 'swilliams->kbacon', source: 'swilliams', target: 'kbacon' },
      { id: 'bpitt->kbacon', source: 'bpitt', target: 'kbacon' },
      { id: 'hford->lwilson', source: 'hford', target: 'lwilson' },
      { id: 'lwilson->kbacon', source: 'lwilson', target: 'kbacon' },
    ],
  };

  const graph = new Graph({
    ...context,
    autoFit: 'center',
    data,
    layout: {
      type: 'custom-layout',
    },
    zoom: 0.8,
    node: {
      type: 'rect',
      style: {
        labelText: (d) => d.data!.label as string,
        size: (d) => [d.data!.width, d.data!.height] as [number, number],
      },
    },
  });

  await graph.render();

  return graph;
};
