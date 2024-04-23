import { Graph } from '@antv/g6';

const graph = new Graph({
  zoom: 0.8,
  data: {
    nodes: [
      { id: 'kspacey', data: { label: 'Kevin Spacey', width: 144, height: 100 } },
      { id: 'swilliams', data: { label: 'Saul Williams', width: 160, height: 100 } },
      { id: 'bpitt', data: { label: 'Brad Pitt', width: 108, height: 100 } },
      { id: 'hford', data: { label: 'Harrison Ford', width: 168, height: 100 } },
      { id: 'lwilson', data: { label: 'Luke Wilson', width: 144, height: 100 } },
      { id: 'kbacon', data: { label: 'Kevin Bacon', width: 121, height: 100 } },
    ],
    edges: [
      { id: 'kspacey->swilliams', source: 'kspacey', target: 'swilliams' },
      { id: 'swilliams->kbacon', source: 'swilliams', target: 'kbacon' },
      { id: 'bpitt->kbacon', source: 'bpitt', target: 'kbacon' },
      { id: 'hford->lwilson', source: 'hford', target: 'lwilson' },
      { id: 'lwilson->kbacon', source: 'lwilson', target: 'kbacon' },
    ],
  },
  node: {
    style: {
      type: 'rect',
      radius: 10,
      iconText: (d) => d.data.label,
      size: (d) => [d.data.width, d.data.height],
    },
    palette: {
      type: 'group',
      field: 'label',
    },
  },
  edge: {
    style: {
      type: 'polyline',
      router: true,
    },
  },
  layout: {
    type: 'dagre',
  },
  behaviors: ['drag-element'],
});

graph.render();
