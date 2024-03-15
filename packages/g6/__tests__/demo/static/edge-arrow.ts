import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const edgeArrow: StaticTestCase = async (context) => {
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
    ...context,
    data,
    edge: {
      style: {
        type: 'line', // 👈🏻 Edge shape type.
        labelText: (d: any) => d.id,
        labelBackground: true,
        endArrow: true,
        endArrowType: (d: any) => d.id.split('-')[0],
      },
    },
    layout: {
      type: 'grid',
      cols: 2,
    },
  });

  await graph.render();
};
