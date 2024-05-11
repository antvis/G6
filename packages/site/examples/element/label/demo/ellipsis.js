import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 100, y: 150, size: 100 } },
    { id: 'node-2', style: { x: 400, y: 150, size: 150 } },
  ],
  edges: [{ source: 'node-1', target: 'node-2' }],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelPlacement: 'center',
      labelText: 'This label is too long to be displayed',
      labelWordWrap: true, // enable label ellipsis
      labelMaxWidth: '90%',
      labelBackgroundFill: '#eee',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
    },
  },
  edge: {
    style: {
      labelOffsetY: -4,
      labelTextBaseline: 'bottom',
      labelText: 'This label is too long to be displayed',
      labelWordWrap: true,
      labelMaxWidth: '80%',
      labelBackgroundFill: 'red',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
