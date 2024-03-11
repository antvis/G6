import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const edgeCubicHorizontal: StaticTestCase = async (context) => {
  const { container, animation, theme } = context;

  const data = {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }, { id: 'node6' }],
    edges: [
      {
        id: 'line-default',
        source: 'node1',
        target: 'node2',
      },
      {
        id: 'line-active',
        source: 'node1',
        target: 'node3',
      },
      {
        id: 'line-selected',
        source: 'node1',
        target: 'node4',
      },
      {
        id: 'line-highlight',
        source: 'node1',
        target: 'node5',
      },
      {
        id: 'line-inactive',
        source: 'node1',
        target: 'node6',
      },
    ],
  };

  const graph = new Graph({
    container: container,
    theme,
    data,
    node: {
      style: {
        port: true,
        ports: [{ placement: 'left' }, { placement: 'right' }],
      },
    },
    edge: {
      style: {
        type: 'cubic-horizontal', // 👈🏻 Edge shape type.
        labelText: (d: any) => d.id,
        endArrow: true,
      },
    },
    layout: {
      type: 'dagre',
      begin: [50, 50],
      rankdir: 'LR',
      nodesep: 30,
      ranksep: 150,
    },
    animation,
  });

  await graph.render();

  graph.setElementState('line-active', 'active');
  graph.setElementState('line-selected', 'selected');
  graph.setElementState('line-highlight', 'highlight');
  graph.setElementState('line-inactive', 'inactive');
};
