import { idOf } from '@/src/utils/id';
import { Graph } from '@antv/g6';

export const elementEdgeArrow: TestCase = async (context) => {
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
      type: 'line', // 👈🏻 Edge shape type.
      style: {
        labelText: (d) => d.id!,
        labelBackground: true,
        endArrow: true,
        endArrowType: (d: any) => idOf(d).toString().split('-')[0] as any,
      },
    },
    behaviors: ['drag-element'],
    layout: {
      type: 'grid',
      cols: 2,
    },
  });

  await graph.render();

  return graph;
};
