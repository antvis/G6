import { Graph } from '@antv/g6';

const edgeIds = [
  'default-arrow',
  'triangle-arrow',
  'simple-arrow',
  'vee-arrow',
  'circle-arrow',
  'rect-arrow',
  'diamond-arrow',
  'triangleRect-arrow',
];

const data = {
  nodes: new Array(16).fill(0).map((_, i) => ({ id: `node${i + 1}` })),
  edges: edgeIds.map((id, i) => ({
    id,
    source: `node${i * 2 + 1}`,
    target: `node${i * 2 + 2}`,
  })),
};

const graph = new Graph({
  data,
  edge: {
    style: {
      type: 'line', // 👈🏻 Edge shape type.
      labelText: (d) => d.id!,
      labelBackground: true,
      endArrow: true,
      endArrowType: (d) => d.id.split('-')[0],
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
});

graph.render();
