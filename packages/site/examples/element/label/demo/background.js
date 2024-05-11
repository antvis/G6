import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 150, y: 100 } },
    { id: 'node2', style: { x: 250, y: 200 } },
    { id: 'node3', style: { x: 450, y: 200 } },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node3' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
      labelPosition: 'bottom',
      labelFill: '#e66465',
      labelFontSize: 12,
      labelFontStyle: 'italic',
      labelBackground: true,
      labelBackgroundFill: 'linear-gradient(#e66465, #9198e5)',
      labelBackgroundStroke: '#9ec9ff',
      labelBackgroundRadius: 2,
    },
  },
  edge: {
    style: {
      labelText: (d) => d.id,
      labelPosition: 'center',
      labelTextBaseline: 'top',
      labelDy: 5,
      labelFontSize: 12,
      labelFontWeight: 'bold',
      labelFill: '#1890ff',
      labelBackground: true,
      labelBackgroundFill: 'linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
      labelBackgroundStroke: '#9ec9ff',
      labelBackgroundRadius: 2,
    },
  },
  layout: {
    type: 'force',
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
