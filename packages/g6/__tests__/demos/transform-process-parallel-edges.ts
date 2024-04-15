import { Graph } from '@/src';

export const transformProcessParallelEdges: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        {
          id: 'node1',
          style: {
            x: 260,
            y: 220,
          },
        },
        {
          id: 'node2',
          style: {
            x: 186,
            y: 342,
          },
        },
        {
          id: 'node3',
          style: {
            x: 131,
            y: 194,
          },
        },
        {
          id: 'node4',
          style: {
            x: 258,
            y: 80,
          },
        },
        {
          id: 'node5',
          style: {
            x: 395,
            y: 186,
          },
        },
        {
          id: 'node6',
          style: {
            x: 333,
            y: 337,
          },
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node4',
          style: { color: '#8576FF', lineWidth: 2, startArrow: true },
        },
        {
          id: 'edge2',
          source: 'node4',
          target: 'node1',
          style: { endArrow: true },
        },
        { id: 'edge3', source: 'node4', target: 'node1' },
        { id: 'edge4', source: 'node1', target: 'node4' },
        { id: 'edge5', source: 'node1', target: 'node2' },
        { id: 'edge6', source: 'node1', target: 'node2' },
        { id: 'edge7', source: 'node1', target: 'node3' },
        { id: 'edge8', source: 'node1', target: 'node5' },
        { id: 'edge9', source: 'node1', target: 'node6' },
        { id: 'edge10', source: 'node1', target: 'node6' },
        { id: 'edge11', source: 'node1', target: 'node6' },
        { id: 'loop1', source: 'node5', target: 'node5', style: { color: '#8576FF', lineWidth: 2 } },
        { id: 'loop2', source: 'node5', target: 'node5' },
        { id: 'loop3', source: 'node5', target: 'node5' },
        { id: 'loop4', source: 'node5', target: 'node5' },
        { id: 'loop5', source: 'node5', target: 'node5' },
        { id: 'loop6', source: 'node5', target: 'node5' },
        { id: 'loop7', source: 'node5', target: 'node5' },
        { id: 'loop8', source: 'node5', target: 'node5' },
        { id: 'loop9', source: 'node5', target: 'node5' },
        { id: 'loop10', source: 'node5', target: 'node5' },
        { id: 'loop11', source: 'node5', target: 'node5' },
        { id: 'loop12', source: 'node5', target: 'node5' },
        { id: 'loop13', source: 'node5', target: 'node5' },
        { id: 'loop14', source: 'node5', target: 'node5' },
        { id: 'loop15', source: 'node5', target: 'node5' },
        { id: 'loop16', source: 'node5', target: 'node5' },
        { id: 'loop17', source: 'node5', target: 'node5' },
      ],
    },
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    behaviors: [
      'drag-element',
      {
        type: 'hover-element',
        key: 'hover-element',
        enable: (event) => event.targetType === 'edge',
      },
    ],
    transforms: [{ type: 'process-parallel-edges', key: 'process-parallel-edges' }],
  });

  await graph.render();

  let targetIndex = 2;

  transformProcessParallelEdges.form = (panel) => [
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
