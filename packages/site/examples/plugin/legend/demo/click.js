import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: '2', type: 'rect', data: { cluster: 'node-type2' } },
    { id: '3', type: 'triangle', data: { cluster: 'node-type3' } },
    { id: '4', type: 'diamond', data: { cluster: 'node-type4' } },
  ],
  edges: [
    { source: '1', target: '2', type: 'quadratic', data: { cluster: 'edge-type1' } },
    { source: '1', target: '4', data: { cluster: 'edge-type2' } },
    { source: '3', target: '4' },
    { source: '2', target: '4', data: { cluster: 'edge-type3' } },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: { size: 32 },
    palette: { field: 'cluster' },
  },
  edge: {
    palette: { field: 'cluster' },
  },
  layout: {
    type: 'force',
  },
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      trigger: 'click',
      gridRow: 1,
      gridCol: 4,
      itemLabelFontSize: 12,
    },
  ],
});

graph.render();
