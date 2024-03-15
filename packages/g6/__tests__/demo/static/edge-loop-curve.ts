import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const edgeLoopCurve: StaticTestCase = async (context) => {
  const data = {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3-ports' }, { id: 'node4-ports' }],
    edges: [
      {
        id: 'loop-1',
        source: 'node1',
        target: 'node1',
        placement: 'top',
      },
      {
        id: 'loop-2',
        source: 'node1',
        target: 'node1',
        placement: 'right',
      },
      {
        id: 'loop-3',
        source: 'node1',
        target: 'node1',
        placement: 'bottom',
      },
      {
        id: 'loop-4',
        source: 'node1',
        target: 'node1',
        placement: 'left',
      },
      {
        id: 'loop-5',
        source: 'node2',
        target: 'node2',
        placement: 'top-right',
      },
      {
        id: 'loop-6',
        source: 'node2',
        target: 'node2',
        placement: 'bottom-right',
      },
      {
        id: 'loop-7',
        source: 'node2',
        target: 'node2',
        placement: 'bottom-left',
      },
      {
        id: 'loop-8',
        source: 'node2',
        target: 'node2',
        placement: 'top-left',
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
      style: {
        type: 'rect',
        size: [80, 30],
        labelBackground: true,
        port: (d: any) => d.id.includes('ports'),
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
      style: {
        type: 'line',
        endArrow: true,
        loopPlacement: (d: any) => d.placement,
      },
    },
    layout: {
      type: 'grid',
    },
  });

  await graph.render();
};
