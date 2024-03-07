import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 100,
        y: 150,
        label: 'This label is too long to be displayed',
        size: 100,
      },
    },
    {
      id: 'node2',
      data: {
        x: 400,
        y: 150,
        label: 'This label is too long to be displayed',
        size: 150,
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      data: {
        label: 'This label is too long to be displayed',
      },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      x: (d) => d.data.x,
      y: (d) => d.data.y,
      size: (d) => d.data.size,
      labelPosition: 'center',
      labelText: (d) => d.data.label,
      labelMaxWidth: '90%',
      labelBackgroundFill: '#eee',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
    },
  },
  edge: {
    style: {
      labelPosition: 'top',
      labelOffsetY: -10,
      labelText: (d) => d.data.label,
      labelMaxWidth: '80%',
      labelBackgroundFill: 'red',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
    },
  },
  behaviors: ['drag-node'],
});

graph.render();
