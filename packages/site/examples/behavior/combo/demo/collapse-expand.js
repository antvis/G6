import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 300, y: 100 } },
      { id: 'node2', combo: 'combo1', style: { x: 300, y: 150 } },
      { id: 'node3', combo: 'combo2', style: { x: 100, y: 100 } },
      { id: 'node4', combo: 'combo2', style: { x: 50, y: 150 } },
      { id: 'node5', combo: 'combo2', style: { x: 150, y: 150 } },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node3', target: 'node4' },
      { source: 'node3', target: 'node5' },
    ],
    combos: [
      { id: 'combo1', style: { labelText: '双击折叠', collapsed: true } },
      { id: 'combo2', style: { labelText: '单击折叠', collapsed: false } },
    ],
  },
  behaviors: [
    {
      type: 'collapse-expand',
      trigger: 'dblclick',
      enable: (event) => event.targetType === 'combo' && event.target.id === 'combo1',
    },
    {
      type: 'collapse-expand',
      trigger: 'click',
      enable: (event) => event.targetType === 'combo' && event.target.id === 'combo2',
    },
  ],
});

graph.render();
