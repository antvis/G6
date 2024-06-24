import { Graph } from '@/src';
import data from '@@/dataset/combo.json';

export const pluginTooltip: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'combo-combined',
      comboPadding: 2,
    },
    behaviors: ['drag-canvas', 'drag-element'],
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    plugins: [
      {
        key: 'tooltip',
        type: 'tooltip',
        trigger: 'click',
        getContent: (evt: any, items: any[]) => {
          return `<div>${items[0].id || items[0].source + ' --> ' + items[0].target}</div>`;
        },
      },
    ],
    autoFit: 'view',
  });

  await graph.render();

  pluginTooltip.form = (panel) => {
    const config = {
      trigger: 'click',
    };
    return [
      panel
        .add(config, 'trigger', ['hover', 'click'])
        .name('Change Trigger Method')
        .onChange((trigger: string) => {
          graph.setPlugins((plugins) =>
            plugins.map((plugin) => {
              if (typeof plugin === 'object' && plugin.type === 'tooltip') return { ...plugin, trigger };
              return plugin;
            }),
          );
        }),
    ];
  };

  return graph;
};
