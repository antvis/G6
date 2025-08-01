import { Graph } from '@antv/g6';

export const pluginTitle: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: { nodes: Array.from({ length: 12 }).map((_, i) => ({ id: `node${i}` })) },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    plugins: [
      {
        key: 'title',
        type: 'title',

        align: 'center',
        spacing: 4,
        size: 60,

        title: '这是一个标题这是一个标题',
        titleFontSize: 28,
        titleFontFamily: 'sans-serif',
        titleFontWeight: 600,
        titleFill: '#fff',
        titleFillOpacity: 1,
        titleStroke: '#000',
        titleLineWidth: 2,
        titleStrokeOpacity: 1,

        subtitle: '这是一个副标',
        subtitleFontSize: 16,
        subtitleFontFamily: 'Arial',
        subtitleFontWeight: 300,
        subtitleFill: '#2989FF',
        subtitleFillOpacity: 1,
        subtitleStroke: '#000',
        subtitleLineWidth: 1,
        subtitleStrokeOpacity: 0.5,
      },
    ],
    node: {
      palette: 'spectral',
      style: { labelText: '你好' },
    },
    layout: {
      type: 'circular',
    },
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
