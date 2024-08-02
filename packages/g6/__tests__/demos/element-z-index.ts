import { Graph } from '@antv/g6';

export const elementZIndex: TestCase = async (context) => {
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
      combos: [
        { id: 'combo-1', style: { x: 50, y: 250 } },
        { id: 'combo-2', combo: 'combo-1', style: { x: 50, y: 250 } },
        { id: 'combo-3', combo: 'combo-2', style: { x: 150, y: 250 } },
        { id: 'combo-4', style: { x: 350, y: 250 } },
      ],
    },
    node: {
      style: {
        size: 40,
        labelText: (d) => d.id,
        labelWordWrapWidth: 200,
      },
      palette: 'tableau',
    },
    combo: {
      style: {
        labelText: (d) => d.id,
        fillOpacity: 1,
      },
      palette: 'tableau',
    },
    behaviors: ['drag-element'],
  });

  await graph.render();

  return graph;
};
