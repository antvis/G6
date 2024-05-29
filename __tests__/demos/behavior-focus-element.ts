import { Graph } from '@antv/g6';

export const behaviorFocusElement: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 100 } },
        { id: 'node-2', combo: 'combo-1', style: { x: 200, y: 100 } },
        { id: 'node-3', style: { x: 100, y: 200 } },
        { id: 'node-4', combo: 'combo-1', style: { x: 200, y: 200 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-2', target: 'node-4' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-3', target: 'node-4' },
      ],
      combos: [{ id: 'combo-1' }],
    },
    node: { style: { size: 20 } },
    edge: {
      style: { endArrow: true },
    },
    behaviors: ['focus-element'],
  });

  await graph.render();

  return graph;
};
