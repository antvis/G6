import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 200, y: 250 } },
      { id: 'node-2', style: { x: 250, y: 200 } },
      { id: 'node-3', style: { x: 300, y: 250 } },
      { id: 'node-4', style: { x: 250, y: 300 } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2' },
      { source: 'node-2', target: 'node-3' },
      { source: 'node-3', target: 'node-4' },
      { source: 'node-4', target: 'node-1' },
    ],
  },
  behaviors: [
    {
      key: 'lasso-select',
      type: 'lasso-select',
      mode: 'diff',
      trigger: 'shift',
      style: {
        fill: '#00f',
        fillOpacity: 0.1,
        stroke: '#0ff',
        lineWidth: 2,
      },
    },
  ],
});

graph.render();

window.addPanel((gui) => {
  gui.add({ trigger: 'shift' }, 'trigger', ['shift', 'alt', 'ctrl', 'drag', 'meta']).onChange((value) => {
    graph.updateBehavior({ key: 'lasso-select', trigger: value });
  });
});
