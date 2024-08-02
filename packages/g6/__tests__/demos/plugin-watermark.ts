import data from '@@/dataset/cluster.json';
import { Graph, PluginOptions } from '@antv/g6';

export const pluginWatermark: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3-force' },
    plugins: [
      {
        type: 'watermark',
        text: 'hello, \na watermark.',
        textFontSize: 12,
      },
    ],
  });

  await graph.render();

  function updatePlugin(type: string, config: object) {
    return (plugins: PluginOptions) => {
      return plugins.map((plugin) => {
        if (typeof plugin === 'object' && plugin.type === type) return { ...plugin, ...config };
        return plugin;
      });
    };
  }
  pluginWatermark.form = (panel) => {
    const config = {
      width: 200,
      height: 100,
      textFontSize: 12,
    };
    return [
      panel
        .add(config, 'width', 150, 400, 10)
        .name('Width')
        .onChange((width: number) => {
          graph.setPlugins(updatePlugin('watermark', { width }));
        }),
      panel
        .add(config, 'height', 100, 200, 10)
        .name('Height')
        .onChange((height: number) => {
          graph.setPlugins(updatePlugin('watermark', { height }));
        }),
      panel
        .add(config, 'textFontSize', 10, 32, 1)
        .name('TextFontSize')
        .onChange((textFontSize: number) => {
          graph.setPlugins(updatePlugin('watermark', { textFontSize }));
        }),
    ];
  };

  return graph;
};
