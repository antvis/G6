import { Graph } from '@antv/g6';

export const elementEdgeSize: TestCase = async (context) => {
  const data = {
    nodes: new Array(14).fill(0).map((_, i) => ({ id: `node${i + 1}` })),
    edges: [1, 2, 4, 6, 8, 10, 12].map((lineWidth, i) => ({
      id: `edge-${i}`,
      source: `node${i * 2 + 1}`,
      target: `node${i * 2 + 2}`,
      style: { lineWidth },
    })),
  };

  const graph = new Graph({
    ...context,
    data,
    edge: {
      type: 'line', // 👈🏻 Edge shape type.
      style: { endArrow: true },
    },
    layout: {
      type: 'grid',
      cols: 2,
    },
    behaviors: ['drag-element'],
  });

  await graph.render();

  return graph;
};
