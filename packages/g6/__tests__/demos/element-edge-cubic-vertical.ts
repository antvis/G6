import { Graph } from '@/src';

export const elementEdgeCubicVertical: TestCase = async (context) => {
  const data = {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }, { id: 'node6' }],
    edges: [
      {
        id: 'line-default',
        source: 'node1',
        target: 'node2',
      },
      {
        id: 'line-active',
        source: 'node1',
        target: 'node3',
      },
      {
        id: 'line-selected',
        source: 'node1',
        target: 'node4',
      },
      {
        id: 'line-highlight',
        source: 'node1',
        target: 'node5',
      },
      {
        id: 'line-inactive',
        source: 'node1',
        target: 'node6',
      },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        port: true,
        ports: [{ placement: 'top' }, { placement: 'bottom' }],
      },
    },
    edge: {
      type: 'cubic-vertical', // 👈🏻 Edge shape type.
      style: {
        labelText: (d) => d.id!,
        labelBackground: true,
        endArrow: true,
      },
    },
    layout: {
      type: 'antv-dagre',
      begin: [50, 50],
      rankdir: 'TB',
      nodesep: 25,
      ranksep: 150,
    },
  });

  await graph.render();

  graph.setElementState({
    'line-active': 'active',
    'line-selected': 'selected',
    'line-highlight': 'highlight',
    'line-inactive': 'inactive',
  });

  return graph;
};
