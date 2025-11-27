import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const pluginToolbarBuildIn: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3-force' },
    plugins: [
      {
        type: 'toolbar',
        position: 'top-left',
        onClick: (item: string, e: MouseEvent) => {
          console.log('item clicked:', item, e);
        },
        getItems: () => {
          return [
            { id: 'zoom-in', value: 'zoom-in', title: 'Zoom in' },
            { id: 'zoom-out', value: 'zoom-out', title: 'Zoom out' },
            { id: 'redo', value: 'redo', title: 'Redo' },
            { id: 'undo', value: 'undo', title: 'Undo' },
            { id: 'edit', value: 'edit', title: 'Edit' },
            { id: 'delete', value: 'delete', title: 'Delete' },
            { id: 'auto-fit', value: 'auto-fit', title: 'Auto fit' },
            { id: 'export', value: 'export', title: 'Export' },
            { id: 'reset', value: 'reset', title: 'Reset' },
          ];
        },
      },
    ],
  });

  await graph.render();

  pluginToolbarBuildIn.form = (panel) => {
    const config = {
      position: 'top-left',
    };
    return [
      panel
        .add(config, 'position', {
          'top-right': 'top-right',
          'top-left': 'top-left',
          'bottom-right': 'bottom-right',
          'bottom-left': 'bottom-left',
          'left-top': 'left-top',
          'left-bottom': 'left-bottom',
          'right-top': 'right-top',
          'right-bottom': 'right-bottom',
        })
        .name('Position')
        .onChange((position: string) => {
          graph.setPlugins([
            {
              type: 'toolbar',
              position,
              getItems: () => {
                return [
                  { id: 'zoom-in', value: 'zoom-in' },
                  { id: 'zoom-out', value: 'zoom-out' },
                ];
              },
              enable: true,
            },
          ]);
          graph.render();
        }),
    ];
  };

  return graph;
};
