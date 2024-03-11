import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const edgeQuadratic: StaticTestCase = async (context) => {
  const { container, animation, theme } = context;

  const edgeIds = ['line-default', 'line-active', 'line-selected', 'line-highlight', 'line-inactive'];

  const data = {
    nodes: new Array(6).fill(0).map((_, i) => ({ id: `node${i + 1}` })),
    edges: edgeIds.map((id, i) => ({
      id,
      source: 'node1',
      target: `node${i + 2}`,
    })),
  };

  const graph = new Graph({
    container: container,
    theme,
    data,
    edge: {
      style: {
        type: 'quadratic', // 👈🏻 Edge shape type.
        labelText: (d: any) => d.id,
        endArrow: true,
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 220,
      linkDistance: 220,
    },
    animation,
  });

  await graph.render();

  graph.setElementState('line-active', 'active');
  graph.setElementState('line-selected', 'selected');
  graph.setElementState('line-highlight', 'highlight');
  graph.setElementState('line-inactive', 'inactive');
};
