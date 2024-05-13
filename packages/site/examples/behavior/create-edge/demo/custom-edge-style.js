import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',

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
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click',
      onCreate: (edge) => {
        const { style, ...rest } = edge;
        return {
          ...rest,
          style: {
            ...style,
            stroke: 'red',
            lineWidth: 2,
            endArrow: true,
          },
        };
      },
    },
  ],
});

graph.render();
