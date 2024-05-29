import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const pluginToolbarIconfont: TestCase = async (context) => {
  // Use iconfont for toolbar items.
  const iconFont = document.createElement('script');
  iconFont.src = '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js';
  document.head.appendChild(iconFont);

  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3force' },
    plugins: [
      {
        type: 'toolbar',
        position: 'right-top',
        onClick: (item: string, e: MouseEvent) => {
          console.log('item clicked:', item, e);
        },
        getItems: () => {
          return [
            { id: 'icon-xinjian', value: 'new' },
            { id: 'icon-fenxiang', value: 'share' },
            { id: 'icon-chexiao', value: 'undo' },
          ];
        },
      },
    ],
  });

  await graph.render();

  return graph;
};
