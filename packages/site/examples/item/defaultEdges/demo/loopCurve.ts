import { Graph } from '@antv/g6';

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
      sourcePort: 'port1',
      targetPort: 'port2',
    },
    {
      id: 'loop-10',
      source: 'node4-ports',
      target: 'node4-ports',
      sourcePort: 'port2',
      targetPort: 'port2',
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'rect',
      size: [80, 30],
      port: (d: any) => d.id.includes('ports'),
      portR: 3,
      ports: [
        {
          key: 'port1',
          placement: [0.7, 0],
        },
        {
          key: 'port2',
          placement: 'right',
        },
      ],
    },
  },
  edge: {
    style: {
      type: 'line',
      sourcePort: (d: any) => d.sourcePort,
      targetPort: (d: any) => d.targetPort,
      endArrow: true,
      loopPlacement: (d: any) => d.placement,
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
