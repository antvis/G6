import { Graph } from '@/src';
import data from '@@/dataset/radial.json';

export const layoutRadialPreventOverlapUnstrict: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d) => d.id,
        labelPlacement: 'center',
      },
    },
    edge: {
      style: {
        endArrow: true,
        endArrowType: 'vee',
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 70,
      preventOverlap: true,
      strictRadial: false,
    },
    behaviors: ['drag-canvas', 'drag-element'],
  });

  await graph.render();

  return graph;
};
