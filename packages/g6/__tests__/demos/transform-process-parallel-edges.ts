import { Graph } from '@/src';
import data from '@@/dataset/parallel-edges.json';

export const transformProcessParallelEdges: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: data,
    node: { style: { labelText: (d) => d.id } },
    behaviors: [
      'drag-element',
      {
        type: 'hover-element',
        key: 'hover-element',
        enable: (event: any) => event.targetType === 'edge',
      },
    ],
    transforms: [
      {
        type: 'process-parallel-edges',
        key: 'process-parallel-edges',
        mode: 'merge',
        style: {
          lineDash: [2, 2],
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
        graph.setData(data);
        graph.render();
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
                style: { color: '#FF9800', lineWidth: 2 },
              },
              {
                id: 'new-loop',
                source: 'node5',
                target: 'node5',
                style: { color: '#FF9800', lineWidth: 2 },
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
