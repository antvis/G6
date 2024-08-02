import { Graph } from '@antv/g6';

export const elementNodeBadges: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        {
          id: 'node-1',
          style: {
            x: 150,
            y: 150,
            size: 100,
            badges: [
              { text: 'left', placement: 'left' },
              { text: 'right', placement: 'right' },
              { text: 'top', placement: 'top' },
              { text: 'bottom', placement: 'bottom' },
              // { text: 'top-left', placement: 'top-left' },
              // { text: 'top-right', placement: 'top-right' },
              // { text: 'bottom-left', placement: 'bottom-left' },
              // { text: 'bottom-right', placement: 'bottom-right' },
            ],
            badgeFontSize: 8,
            badgePadding: [10, 10],
          },
        },
      ],
    },
  });

  await graph.render();

  elementNodeBadges.form = (panel) => {
    const config = {
      add: () => {
        graph.updateNodeData([
          {
            id: 'node-1',
            style: {
              badges: [
                { text: 'left', placement: 'left' },
                { text: 'right', placement: 'right' },
                { text: 'top', placement: 'top' },
                { text: 'bottom', placement: 'bottom' },
                { text: 'top-left', placement: 'top-left' },
                { text: 'top-right', placement: 'top-right' },
                { text: 'bottom-left', placement: 'bottom-left' },
                { text: 'bottom-right', placement: 'bottom-right' },
              ],
            },
          },
        ]);
        graph.draw();
      },
      update: () => {
        graph.updateNodeData([
          {
            id: 'node-1',
            style: {
              badges: [
                { text: 'left', placement: 'left', backgroundFill: 'red' },
                { text: 'right', placement: 'right' },
                { text: 'top', placement: 'top' },
                { text: 'bottom', placement: 'bottom' },
                { text: 'top-left', placement: 'top-left' },
                { text: 'top-right', placement: 'top-right' },
                { text: 'bottom-left', placement: 'bottom-left' },
                { text: 'bottom-right', placement: 'bottom-right' },
              ],
            },
          },
        ]);
        graph.draw();
      },
      remove: () => {
        graph.updateNodeData([
          {
            id: 'node-1',
            style: {
              badges: [
                { text: 'left', placement: 'left' },
                { text: 'right', placement: 'right' },
                { text: 'top', placement: 'top' },
                { text: 'bottom', placement: 'bottom' },
              ],
            },
          },
        ]);
        graph.draw();
      },
    };
    return [
      panel.add(config, 'add').name('Add Badge'),
      panel.add(config, 'update').name('Update Badge'),
      panel.add(config, 'remove').name('Remove Badge'),
    ];
  };

  return graph;
};
