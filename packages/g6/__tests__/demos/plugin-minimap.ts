import { Graph } from '@/src';
import { Renderer } from '@antv/g-svg';

export const pluginMinimap: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    plugins: [
      {
        key: 'minimap',
        type: 'minimap',
        size: [240, 160],
        renderer: new Renderer(),
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
