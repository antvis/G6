import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  plugins: [
    {
      // lod-controller will be automatically assigned to graph with `disableLod: false` to graph if it is not configured as following
      type: 'lod-controller',
      disableLod: true,
    },
  ],
  data: {
    nodes: [
      { id: 'node1', data: {} },
      { id: 'node2', data: {} },
      { id: 'node3', data: {} },
      { id: 'node4', data: {} },
      { id: 'node5', data: {} },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {},
      },
      { id: 'edge2', source: 'node1', target: 'node3', data: {} },
      { id: 'edge3', source: 'node1', target: 'node4', data: {} },
      { id: 'edge4', source: 'node2', target: 'node3', data: {} },
      { id: 'edge5', source: 'node3', target: 'node4', data: {} },
      { id: 'edge6', source: 'node4', target: 'node5', data: {} },
    ],
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
            color: 'red',
            lineWidth: 2,
            endArrow: true,
          },
        };
      },
    },
  ],
});

graph.render();
