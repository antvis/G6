import { idOf } from '@/src/utils/id';
import { Graph } from '@antv/g6';

export const elementEdgeLoopPolyline: TestCase = async (context) => {
  const data = {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3-ports' }, { id: 'node4-ports' }],
    edges: [
      {
        id: 'loop-1',
        source: 'node1',
        target: 'node1',
        style: { placement: 'top' },
      },
      {
        id: 'loop-2',
        source: 'node1',
        target: 'node1',
        style: { placement: 'right' },
      },
      {
        id: 'loop-3',
        source: 'node1',
        target: 'node1',
        style: { placement: 'bottom' },
      },
      {
        id: 'loop-4',
        source: 'node1',
        target: 'node1',
        style: { placement: 'left' },
      },
      {
        id: 'loop-5',
        source: 'node2',
        target: 'node2',
        style: { placement: 'top-right' },
      },
      {
        id: 'loop-6',
        source: 'node2',
        target: 'node2',
        style: { placement: 'bottom-right' },
      },
      {
        id: 'loop-7',
        source: 'node2',
        target: 'node2',
        style: { placement: 'bottom-left' },
      },
      {
        id: 'loop-8',
        source: 'node2',
        target: 'node2',
        style: { placement: 'top-left' },
      },
      {
        id: 'loop-9',
        source: 'node3-ports',
        target: 'node3-ports',
        style: {
          sourcePort: 'port-top',
          targetPort: 'port-right',
        },
      },
      {
        id: 'loop-10',
        source: 'node4-ports',
        target: 'node4-ports',
        style: {
          sourcePort: 'port-right',
          targetPort: 'port-right',
        },
      },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'rect',
      style: {
        size: [80, 30],
        port: (d) => idOf(d).toString().includes('ports'),
        portR: 3,
        ports: [
          {
            key: 'port-top',
            placement: [0.7, 0],
          },
          {
            key: 'port-right',
            placement: 'right',
          },
        ],
      },
    },
    edge: {
      type: 'polyline',
      style: {
        endArrow: true,
        loopPlacement: (d) => d.style!.placement,
      },
    },
    layout: {
      type: 'grid',
    },
  });

  await graph.render();

  return graph;
};
