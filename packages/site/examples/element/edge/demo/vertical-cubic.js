import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
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
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
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
    type: 'cubic-vertical',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
    },
  },
  layout: {
    type: 'antv-dagre',
    begin: [50, 50],
    rankdir: 'TB',
    nodesep: 20,
    ranksep: 120,
  },
});

graph.render();
