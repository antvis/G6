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
      enable: true,
      animation: false,
      mode: 'default', // union intersect diff default
      state: 'selected', // 'active', 'selected', 'inactive', ...
      trigger: [], // ['Shift', 'Alt', 'Control', 'Drag', 'Meta', ...]
      style: {
        width: 0,
        height: 0,
        lineWidth: 4,
        lineDash: [2, 2],
        fill: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
        stroke: 'pink',
        fillOpacity: 0.2,
        zIndex: 2,
        pointerEvents: 'none',
      },
    },
  ],
});

graph.render();
