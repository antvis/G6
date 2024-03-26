import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 150,
        y: 100,
      },
    },
    {
      id: 'node2',
      data: { x: 250, y: 200 },
    },
    {
      id: 'node3',
      data: { x: 450, y: 200 },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'edge2',
      source: 'node1',
      target: 'node3',
    },
    {
      id: 'edge3',
      source: 'node2',
      target: 'node3',
    },
  ],
};

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 400,
  data,
  node: {
    style: {
      labelText: (d) => d.id,
      labelPosition: 'bottom',
    },
  },
  edge: {

  },
  layout: {
    type: 'force',
  },
  animation: true,
  behaviors: ['drag-element', {
    type: 'fouse-element',
    animation: {
      easing: 'ease-out',
      duration: 3500,
    },
  }],
});

graph.render();
