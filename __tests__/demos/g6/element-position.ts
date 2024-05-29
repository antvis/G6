import { Graph } from '@antv/g6';

export const elementPosition: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', style: { x: 125, y: 150 } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2' },
        { id: 'edge-2', source: 'node-2', target: 'node-3' },
        { id: 'edge-3', source: 'node-3', target: 'node-1' },
      ],
    },
    node: {
      style: {
        size: 20,
      },
    },
  });

  await graph.render();

  elementPosition.form = (panel) => {
    const config = {
      element: 'node-1',
      x: 50,
      y: 50,
    };

    const translate = () => {
      graph.translateElementTo(
        {
          [config.element]: [config.x, config.y],
        },
        false,
      );
    };

    const element = panel.add(config, 'element', ['node-1', 'node-2', 'node-3']).onChange((id: string) => {
      const position = graph.getElementPosition(id);
      x.setValue(position[0]);
      y.setValue(position[1]);
    });
    const x = panel.add(config, 'x', 0, 300, 1).onChange(translate);
    const y = panel.add(config, 'y', 0, 300, 1).onChange(translate);
    return [element, x, y];
  };

  return graph;
};
