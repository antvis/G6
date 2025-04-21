import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'A', style: { x: 50, y: 350 } },
    { id: 'B', style: { x: 250, y: 150 } },
    { id: 'C', style: { x: 450, y: 350 } },
  ],
  edges: [
    { source: 'A', target: 'B' },
    { source: 'B', target: 'A' },
    { id: 'B-C:1', source: 'B', target: 'C' },
    { id: 'B-C:2', source: 'B', target: 'C' },
    { source: 'A', target: 'C' },
  ],
};

const graph = new Graph({
  container: 'container',
  autoFit: 'center',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  edge: {
    style: {
      labelText: (d) => d?.data?.label || `${d.source}->${d.target}`,
      startArrow: false,
    },
  },
  transforms: [
    {
      type: 'process-parallel-edges',
      mode: 'merge',
      style: {
        halo: true,
        haloOpacity: 0.2,
        haloStroke: 'red',
        startArrow: true,
      }
    }
  ],
});

graph.render();
