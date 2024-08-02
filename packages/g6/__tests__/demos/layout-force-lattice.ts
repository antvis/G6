// ref: https://observablehq.com/@d3/force-directed-lattice
import { Graph } from '@antv/g6';

export const layoutForceLattice: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: getData(),
    layout: {
      type: 'd3-force',
      manyBody: {
        strength: -30,
      },
      link: {
        strength: 1,
        distance: 20,
        iterations: 10,
      },
    },
    node: {
      style: {
        size: 10,
        fill: '#000',
      },
    },
    edge: {
      style: {
        stroke: '#000',
      },
    },
    behaviors: [{ type: 'drag-element-force' }, 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};

function getData(size = 10) {
  const nodes = Array.from({ length: size * size }, (_, i) => ({ id: `${i}` }));
  const edges = [];
  for (let y = 0; y < size; ++y) {
    for (let x = 0; x < size; ++x) {
      if (y > 0) edges.push({ source: `${(y - 1) * size + x}`, target: `${y * size + x}` });
      if (x > 0) edges.push({ source: `${y * size + (x - 1)}`, target: `${y * size + x}` });
    }
  }
  return { nodes, edges };
}
