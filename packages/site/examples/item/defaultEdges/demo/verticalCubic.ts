import { Graph } from '@antv/g6';

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
  container: 'container',
  data,
  node: {
    style: {
      port: true,
      ports: [{ placement: 'top' }, { placement: 'bottom' }],
    },
  },
  edge: {
    style: {
      type: 'cubic-vertical', // 👈🏻 Edge shape type.
      labelText: (d) => d.id!,
      endArrow: true,
    },
  },
  layout: {
    type: 'dagre',
    begin: [50, 50],
    rankdir: 'TB',
    nodesep: 35,
    ranksep: 150,
  },
});

graph.render();

graph.on('afterrender', () => {
  graph.setElementState({
    'line-active': 'active',
    'line-selected': 'selected',
    'line-highlight': 'highlight',
    'line-inactive': 'inactive',
  });
});
