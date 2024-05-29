import { ExtensionCategory, Graph, Minimap, PluginOptions, register } from '@/src';
import data from '@@/dataset/cluster.json';
import { isObject } from '@antv/util';
import { MinimapOptions } from '../../src/plugins';

function updatePlugin(type: string, config: object) {
  return (plugins: PluginOptions) => {
    return plugins.map((plugin) => {
      if (isObject(plugin) && plugin.type === type) return { ...plugin, ...config };
      return plugin;
    });
  };
}

export const pluginMinimap: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, 'minimap', Minimap);
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3force' },
    behaviors: ['drag-canvas'],
    plugins: [{ type: 'minimap', follow: false }],
  });

  pluginMinimap.form = (panel) => {
    const config: MinimapOptions = {
      resize: () => {
        const $container = document.getElementById('container')!;
        Object.assign($container.style, { width: '600px', height: '600px' });
        window.dispatchEvent(new Event('resize'));
      },
      follow: false,
      mode: 'default',
      size: [20, 20],
      fresh: true,
      zoom: 1,
    };

    return [
      panel.add(config, 'resize').name('Emit Resize'),
      panel.add(config, 'mode', ['default', 'keyShape', 'delegate']).onChange((mode: MinimapOptions['mode']) => {
        graph.setPlugins(updatePlugin('minimap', { mode }));
      }),
      panel.add(config, 'zoom', 0.01, 10, 1).onChange((zoom: number) => graph.zoomTo(zoom)),
      panel.add(config, 'refresh', [true, false]).onChange((refresh: MinimapOptions['refresh']) => {
        graph.setPlugins(updatePlugin('minimap', { refresh }));
      }),
    ];
  };
  await graph.render();

  return graph;
};
