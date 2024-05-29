import data from '@@/dataset/radial.json';
import { Graph } from '@antv/g6';

export const layoutRadialBasic: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d) => d.id,
        labelPlacement: 'center',
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 50,
    },
    behaviors: ['drag-canvas', 'drag-element'],
  });

  await graph.render();

  return graph;
};
