import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      active: {
        fill: '#0b0',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
      unselectedState: 'inactive',
      multiple: true,
      trigger: ['shift'],
    },
    'drag-element',
  ],
});

graph.render();
