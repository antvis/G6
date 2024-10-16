import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '1', target: '4' },
    { source: '0', target: '3' },
    { source: '3', target: '4' },
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '5', target: '7' },
    { source: '5', target: '8' },
    { source: '8', target: '9' },
    { source: '2', target: '9' },
    { source: '3', target: '9' },
  ],
};

const graph = new Graph({
  container: 'container',
  autoFit: 'view',
  animation: false,
  data,
  layout: {
    type: 'antv-dagre',
    nodeSize: [60, 30],
    nodesep: 60,
    ranksep: 40,
    controlPoints: true,
  },
  node: {
    type: 'rect',
    style: {
      size: [60, 30],
      radius: 8,
      labelText: (d) => d.id,
      labelBackground: true,
    }
  },
  edge: {
    type: 'polyline',
  },
  behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
});

graph.render();

window.addPanel((gui) => {
  const config = { layout: 'default' };
  const layouts = {
    default: { type: 'antv-dagre', nodesep: 100, ranksep: 70, controlPoints: true },
    LR: { type: 'antv-dagre', rankdir: 'LR', align: 'DL', nodesep: 50, ranksep: 70, controlPoints: true },
    'LR&UL': { type: 'antv-dagre', rankdir: 'LR', align: 'UL', controlPoints: true, nodesep: 50, ranksep: 70 },
  };

  gui.add(config, 'layout', Object.keys(layouts)).onChange(async (layout) => {
    graph.setLayout(layouts[layout]);
    await graph.layout();
    graph.fitCenter();
  });
});
