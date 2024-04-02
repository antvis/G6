import { Graph } from '@/src';

export const elementEdgeLine: TestCase = async (context) => {
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
    edge: {
      style: {
        type: 'line', // 👈🏻 Edge shape type.
        labelText: (d) => d.id!,
        labelBackground: true,
        endArrow: true,
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 220,
      linkDistance: 220,
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
