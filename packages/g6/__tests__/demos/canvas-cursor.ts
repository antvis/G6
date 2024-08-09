import { Graph } from '@antv/g6';

export const canvasCursor: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
    },
    cursor: 'progress',
  });

  await graph.render();

  canvasCursor.form = (panel) => {
    return [
      panel
        .add({ cursor: 'progress' }, 'cursor', [
          'auto',
          'default',
          'none',
          'context-menu',
          'help',
          'pointer',
          'progress',
          'wait',
          'cell',
          'crosshair',
          'text',
          'vertical-text',
          'alias',
          'copy',
          'move',
          'no-drop',
          'not-allowed',
          'grab',
          'grabbing',
          'all-scroll',
          'col-resize',
          'row-resize',
          'n-resize',
          'e-resize',
          's-resize',
          'w-resize',
          'ne-resize',
          'nw-resize',
          'se-resize',
          'sw-resize',
          'ew-resize',
          'ns-resize',
          'nesw-resize',
          'nwse-resize',
          'zoom-in',
          'zoom-out',
        ])
        .onChange((cursor: any) => {
          graph.setOptions({ cursor });
        }),
    ];
  };

  return graph;
};
