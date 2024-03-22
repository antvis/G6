import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const pluginContextMenu: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3force' },
    plugins: [
      {
        type: 'context-menu',
        trigger: 'contextmenu',
        getContextMenuItems: () => {
          return [
            { name: '展开一度关系', value: 'spread' },
            { name: '查看详情', value: 'detail' },
          ];
        },
        enable: (e: any) => e.targetType === 'node',
      },
    ],
  });

  await graph.render();

  pluginContextMenu.form = (panel) => {
    const config = {
      trigger: 'contextmenu',
    };
    return [
      panel
        .add(config, 'trigger', {
          Click: 'click',
          Contextmenu: 'contextmenu',
        })
        .name('Trigger')
        .onChange((trigger: string) => {
          graph.setPlugins([
            {
              type: 'context-menu',
              trigger,
              getContextMenuItems: () => {
                return [
                  { name: '展开一度关系', value: 'spread' },
                  { name: '查看详情', value: 'detail' },
                ];
              },
              enable: (e: any) => e.targetType === 'node',
            },
          ]);
          graph.render();
        }),
    ];
  };

  return graph;
};
