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
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  behaviors: [
    'scroll-canvas',
    {
      key: 'custom-zoom-canvas',
      type: 'zoom-canvas',
      enable: (event) => {
        return event.ctrlKey; // ctrlKey 为 true 时，是双指捏合或扩张操作，false 时是双指滑动操作
      },
    },
  ],
});

graph.render();
