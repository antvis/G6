import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const pluginGridLine: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3-force' },
    behaviors: ['drag-canvas'],
    plugins: [{ type: 'grid-line', follow: false }],
  });

  await graph.render();

  pluginGridLine.form = (panel) => {
    const config = {
      resize: () => {
        const $container = document.getElementById('container')!;
        Object.assign($container.style, { width: '600px', height: '600px' });
        window.dispatchEvent(new Event('resize'));
      },
      follow: false,
      size: 20,
    };
    return [
      panel.add(config, 'resize').name('Emit Resize'),
      panel
        .add(config, 'follow')
        .name('Follow The Graph')
        .onChange((follow: boolean) => {
          graph.setPlugins((plugins) =>
            plugins.map((plugin) => {
              if (typeof plugin === 'object' && plugin.type === 'grid-line') return { ...plugin, follow };
              return plugin;
            }),
          );
        }),
      panel
        .add(config, 'size', 10, 50, 5)
        .name('Grid Size')
        .onChange((size: number) => {
          graph.setPlugins((plugins) =>
            plugins.map((plugin) => {
              if (typeof plugin === 'object' && plugin.type === 'grid-line') return { ...plugin, size };
              return plugin;
            }),
          );
        }),
    ];
  };

  return graph;
};
