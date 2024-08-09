import { Graph } from '@antv/g6';

export const pluginMinimapImage: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: Array.from({ length: 20 }).map((_, i) => ({
        id: `node${i}`,
        style: {
          src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_Do9Tq7MxFQAAAAAAAAAAAAADmJ7AQ/original',
        },
      })),
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'hover-activate'],
    plugins: [
      {
        key: 'minimap',
        type: 'minimap',
        size: [240, 160],
      },
    ],
    node: {
      type: 'image',
      style: {
        opacity: 0.5,
      },
      state: {
        active: {
          opacity: 1,
        },
      },
    },
    layout: { type: 'circular' },
    autoFit: 'view',
  });

  await graph.render();

  pluginMinimapImage.form = (panel) => {
    return [];
  };

  return graph;
};
