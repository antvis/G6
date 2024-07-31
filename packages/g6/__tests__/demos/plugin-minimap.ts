import { Graph } from '@/src';

export const pluginMinimap: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    plugins: [
      {
        type: 'minimap',
        size: [100, 100],
      },
    ],
    node: {
      palette: 'spectral',
    },
    layout: { type: 'circular' },
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
