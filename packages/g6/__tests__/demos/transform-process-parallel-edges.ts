import data from '@@/dataset/parallel-edges.json';
import { Graph } from '@antv/g6';

export const transformProcessParallelEdges: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: { style: { labelText: (d) => d.id } },
    behaviors: [
      'drag-element',
      {
        type: 'hover-activate',
        key: 'hover-activate',
      },
    ],
    transforms: [
      {
        type: 'process-parallel-edges',
        key: 'process-parallel-edges',
        mode: 'merge',
        style: {
          lineDash: [2, 2],
          lineWidth: 3,
          stroke: '#99add1',
        },
      },
    ],
  });

  await graph.render();

  let targetIndex = 3;

  const config = { mode: 'merge' };

  transformProcessParallelEdges.form = (panel) => [
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
            graph.addEdgeData([
              {
                id: 'new-edge',
                source: 'node1',
                target: 'node4',
                style: { stroke: '#FF9800', lineWidth: 2 },
              },
              {
                id: 'new-loop',
                source: 'node5',
                target: 'node5',
                style: { stroke: '#FF9800', lineWidth: 2 },
              },
            ]);
            graph.draw();
          },
        },
        'Add',
      )
      .name('Add Orange Edge'),
    panel
      .add(
        {
          Remove: () => {
            graph.removeEdgeData(['edge1', 'loop1']);
            graph.draw();
          },
        },
        'Remove',
      )
      .name('Remove Purple Edge'),
    panel
      .add(
        {
          Update: () => {
            const target = ['node2', 'node3', 'node4', 'node5', 'node6'][targetIndex % 5];
            targetIndex++;
            graph.updateEdgeData([{ id: 'new-edge', source: 'node1', target }]);
            graph.draw();
          },
        },
        'Update',
      )
      .name('Update Orange Edge'),
  ];

  return graph;
};
