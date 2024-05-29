import { Graph } from '@antv/g6';

export const elementVisibility: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', style: { x: 125, y: 150 } },
        { id: 'node-4', style: { x: 125, y: 200, visibility: 'hidden' } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2' },
        { id: 'edge-2', source: 'node-2', target: 'node-3' },
        { id: 'edge-3', source: 'node-3', target: 'node-1' },
      ],
    },
    theme: 'light',
    node: { style: { size: 20, labelText: (d) => d.id!.toString().at(-1)! } },
    edge: { style: { endArrow: true, labelText: (d) => d.id! } },
  });

  await graph.render();

  elementVisibility.form = (panel) => {
    const config = {
      element: 'node-1',
      visible: true,
    };
    const element = panel
      .add(config, 'element', ['node-1', 'node-2', 'node-3', 'node-4', 'edge-1', 'edge-2', 'edge-3'])
      .onChange((id: string) => {
        visible.setValue(graph.getElementVisibility(id) !== 'hidden');
      });
    const visible = panel.add(config, 'visible').onChange((value: boolean) => {
      value ? graph.showElement(config.element) : graph.hideElement(config.element);
    });
    return [element, visible];
  };

  return graph;
};
