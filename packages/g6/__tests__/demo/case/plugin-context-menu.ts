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
        trigger: 'click',
        getContextMenuItems: () => {
          return [
            { name: '展开一度关系', value: 'spread' },
            { name: '查看详情', value: 'detail' },
          ];
        },
      },
    ],
  });

  await graph.render();

  return graph;
};
