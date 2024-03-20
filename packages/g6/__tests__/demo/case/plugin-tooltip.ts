import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import { isObject } from '@antv/util';
import type { STDTestCase } from '../types';

export const pluginTooltip: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3force' },
    behaviors: ['drag-canvas', 'drag-element'],
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    plugins: [
      {
        type: 'tooltip',
        getContent: (evt: any, { items }: { items: any[] }) => {
          return `<div>${items[0].id}</div>`;
        },
      },
    ],
  });

  await graph.render();

  pluginTooltip.form = (panel) => {
    const config = {
      trigger: 'pointerenter',
    };
    return [
      panel
        .add(config, 'trigger', ['pointerenter', 'click'])
        .name('Change Trigger Method')
        .onChange((trigger: string) => {
          graph.setPlugins((plugins) =>
            plugins.map((plugin) => {
              if (isObject(plugin) && plugin.type === 'tooltip') return { ...plugin, trigger };
              return plugin;
            }),
          );
        }),
    ];
  };

  return graph;
};
