import data from '@@/dataset/cluster.json';
import { Fullscreen, Graph } from '@antv/g6';

export const pluginFullscreen: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: { type: 'd3-force' },
    plugins: [
      {
        type: 'fullscreen',
        key: 'fullscreen',
      },
    ],
  });

  graph.setPlugins((prev) => [
    ...prev,
    {
      type: 'toolbar',
      key: 'toolbar',
      position: 'top-left',
      onClick: (item: string) => {
        const fullscreenPlugin = graph.getPluginInstance<Fullscreen>('fullscreen');
        if (item === 'request-fullscreen') {
          fullscreenPlugin.request();
        }
        if (item === 'exit-fullscreen') {
          fullscreenPlugin.exit();
        }
      },
      getItems: () => {
        return [
          { id: 'request-fullscreen', value: 'request-fullscreen' },
          { id: 'exit-fullscreen', value: 'exit-fullscreen' },
        ];
      },
    },
  ]);

  await graph.render();
  return graph;
};
