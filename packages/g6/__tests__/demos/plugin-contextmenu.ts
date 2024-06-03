import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';

export const pluginContextmenu: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3-force' },
    plugins: [
      {
        type: 'contextmenu',
        trigger: 'contextmenu',
        getItems: () => {
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

  pluginContextmenu.form = (panel) => {
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
              type: 'contextmenu',
              trigger,
              getContextmenuItems: () => {
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
