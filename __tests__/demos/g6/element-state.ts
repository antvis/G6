import { Graph } from '@antv/g6';

export const elementState: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', states: ['active', 'selected'], style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', states: ['active'], style: { x: 125, y: 150 } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', states: ['active'] },
        { id: 'edge-2', source: 'node-2', target: 'node-3' },
        { id: 'edge-3', source: 'node-3', target: 'node-1' },
      ],
    },
    theme: 'light',
    node: {
      style: {
        size: 20,
      },
      state: {
        selected: {
          fill: 'pink',
        },
      },
      animation: {
        update: [{ fields: ['lineWidth', 'fill'] }],
      },
    },
    edge: {
      style: {
        lineWidth: 1,
      },
      state: {
        active: {
          lineWidth: 2,
          stroke: 'pink',
        },
      },
      animation: {
        update: [
          {
            fields: ['lineWidth', 'stroke'],
          },
        ],
      },
    },
  });

  await graph.render();

  elementState.form = (panel) => {
    const config = {
      element: 'node-1',
      active: true,
      selected: true,
    };

    const setState = () => {
      const state: string[] = [];
      if (config.active) state.push('active');
      if (config.selected) state.push('selected');
      graph.setElementState({ [config.element]: state });
    };

    const element = panel
      .add(config, 'element', ['node-1', 'node-2', 'node-3', 'edge-1', 'edge-2', 'edge-3'])
      .onChange((id: string) => {
        const states = graph.getElementState(id);
        selected.setValue(states.includes('selected'));
        active.setValue(states.includes('active'));
      });
    const active = panel.add(config, 'active').onChange(setState);
    const selected = panel.add(config, 'selected').onChange(setState);

    return [element, active, selected];
  };

  return graph;
};
