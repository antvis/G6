import { Graph } from '@antv/g6';

export const bugDragRotatedCanvas: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node1', target: 'node4' },
        { source: 'node2', target: 'node3' },
        { source: 'node3', target: 'node4' },
        { source: 'node4', target: 'node5' },
      ],
    },
    layout: {
      type: 'grid',
    },
    behaviors: ['drag-canvas'],
  });

  await graph.render();

  graph.rotateTo(2160 + 60);

  return graph;
};
