import { Graph } from '@antv/g6';

export const elementDeleteLastNode: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        {
          id: '1',
          style: {
            x: 200,
            y: 200,
          },
        },
      ],
    },
    node: { style: { labelText: (d) => d.id } },
    behaviors: [
      'drag-element',
      {
        type: 'hover-activate',
        key: 'hover-activate',
      },
    ],
  });

  await graph.render();

  const config = { mode: 'merge' };

  elementDeleteLastNode.form = (panel) => [
    panel
      .add(config, 'mode', ['bundle', 'merge'])
      .name('Mode')
      .onChange((mode: string) => {
        graph.updateTransform({ key: 'process-parallel-edges', mode });
        graph.draw();
      }),
    panel
      .add(
        {
          Add: () => {
            const nodes = graph.getNodeData();
            graph.removeData({
              nodes: nodes?.map((i) => i.id),
            });
            graph.draw();
          },
        },
        'Add',
      )
      .name('Remove All node'),
    panel
      .add(
        {
          Remove: () => {
            graph.addNodeData([
              {
                id: 'add-node' + Math.floor(Math.random() * 10),
                style: {},
              },
            ]);
            console.log(graph.getData());
            graph.draw();
          },
        },
        'Remove',
      )
      .name('Add One Node'),
    panel
      .add(
        {
          Update: () => {
            console.log(graph.getData());
            console.log(graph.getData()?.nodes?.map((i) => graph.getElementVisibility(i.id)));
          },
        },
        'Update',
      )
      .name('Get Node Data'),
  ];

  return graph;
};
