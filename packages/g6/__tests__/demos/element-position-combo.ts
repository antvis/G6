import { Graph } from '@antv/g6';

export const elementPositionCombo: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', combo: 'combo-1', style: { x: 100, y: 150 } },
        { id: 'node-2', combo: 'combo-1', style: { x: 200, y: 150 } },
        { id: 'node-3', combo: 'combo-2', style: { x: 400, y: 200 } },
        { id: 'node-4', combo: 'combo-3', style: { x: 150, y: 300 } },
      ],
      combos: [{ id: 'combo-1', combo: 'combo-2' }, { id: 'combo-2' }, { id: 'combo-3', combo: 'combo-1' }],
    },
    node: {
      style: {
        size: 20,
        labelWordWrapWidth: 200,
        labelText: (d) => d.id,
      },
    },
    combo: {
      style: {
        labelText: (d) => d.id,
      },
    },
    padding: 20,
    autoFit: 'view',
    behaviors: ['hover-activate'],
  });

  await graph.render();

  return graph;
};
