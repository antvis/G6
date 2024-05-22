import { Graph, PluginOptions } from '@/src';
import data from '@@/dataset/cluster.json';
import { isObject } from '@antv/util';

export const pluginBackground: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3force' },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [
      {
        type: 'background',
        backgroundImage:
          'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original)',
      },
    ],
  });

  await graph.render();

  function updatePlugin(type: string, config: object) {
    return (plugins: PluginOptions) => {
      return plugins.map((plugin) => {
        if (isObject(plugin) && plugin.type === type) return { ...plugin, ...config };
        return plugin;
      });
    };
  }
  pluginBackground.form = (panel) => {
    const config = {
      backgroundSize: 'cover',
    };
    return [
      panel
        .add(config, 'backgroundSize', 150, 400, 10)
        .name('backgroundSize')
        .onChange((backgroundSize: string) => {
          graph.setPlugins(updatePlugin('background', { backgroundSize }));
        }),
    ];
  };

  return graph;
};
