import { Graph } from '@/src';

export const elementEdgePort: TestCase = async (context) => {
  const nodes: Record<string, any> = {
    'node-2': {
      ports: [
        { key: 'left', placement: [0, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'right', placement: [1, 0.5], r: 4, fill: '#31d0c6' },
        { key: 'top', placement: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'bottom', placement: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
      ],
    },
    'node-3': {
      ports: [
        { key: 'left', placement: [0, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'right', placement: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'top', placement: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'bottom', placement: [0.5, 1], r: 4, fill: '#31d0c6' },
      ],
    },
    'node-4': {
      ports: [
        { key: 'left', placement: [0, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'right', placement: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
      ],
    },
    'node-5': {
      ports: [
        { key: 'top', placement: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'bottom', placement: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
      ],
    },
    'node-6': {
      ports: [
        { key: 'left', placement: [0, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'right', placement: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
      ],
    },
    'node-7': {
      ports: [
        { key: 'top', placement: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'bottom', placement: [0.5, 1], r: 4, fill: '#31d0c6' },
      ],
    },
    'node-8': {
      ports: [
        { key: 'left', placement: [0, 0.5], r: 4, fill: '#31d0c6' },
        { key: 'right', placement: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
      ],
    },
    'node-9': {
      ports: [
        { key: 'top', placement: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'bottom', placement: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
      ],
    },
    'node-11': {
      ports: [
        { key: 'bottom', placement: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'right', placement: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
      ],
    },
    'node-13': {
      ports: [
        { key: 'bottom', placement: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'right', placement: [1, 0.5], r: 4, fill: '#31d0c6' },
      ],
    },
    'node-14': {
      ports: [
        { key: 'bottom', placement: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
        { key: 'right', placement: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
      ],
    },
    'node-16': {
      ports: [
        { key: 'bottom', placement: [0.5, 1], r: 4, fill: '#31d0c6' },
        { key: 'right', placement: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
      ],
    },
    'node-18': {
      ports: [
        { key: 'bottom', placement: [0.5, 1], r: 4, fill: '#31d0c6' },
        { key: 'right', placement: [1, 0.5], r: 4, stroke: '#31d0c6', fill: '#fff' },
      ],
    },
    'node-19': {
      type: 'star',
    },
  };

  const edges: Record<string, any> = {
    'edge-0': {
      labelText: 'sourcePort❓ targetPort❓',
    },
    'edge-1': {
      sourcePort: 'right',
      targetPort: 'bottom',
      labelText: 'sourcePort✅ targetPort✅',
    },
    'edge-2': {
      labelText: 'sourcePort✖️ targetPort✖️',
    },
    'edge-3': {
      targetPort: 'bottom',
      labelText: 'sourcePort✖️ targetPort✅',
    },
    'edge-4': {
      sourcePort: 'left',
      labelText: 'sourcePort✅ targetPort✖️',
    },
    'edge-5': {
      labelText: 'sourcePort❓ targetPort✖️',
    },
    'edge-6': {
      targetPort: 'right',
      labelText: 'sourcePort❓ targetPort✅',
    },
    'edge-7': {
      labelText: 'sourcePort✖️ targetPort❓',
    },
    'edge-8': {
      sourcePort: 'bottom',
      labelText: 'sourcePort✅ targetPort❓',
    },
    'edge-9': {
      type: 'cubic',
      sourcePort: 'bottom',
      labelText: 'sourcePort✅ targetPort❓',
    },
  };

  const graph = new Graph({
    ...context,
    data: {
      nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node-${i}`, style: nodes[`node-${i}`] || {} })),
      edges: Array.from({ length: 10 }).map((_, i) => ({
        id: `edge-${i}`,
        source: `node-${i * 2}`,
        target: `node-${i * 2 + 1}`,
        style: edges[`edge-${i}`] || {},
      })),
    },
    node: {
      style: {
        x: (_, index) => [50, 200, 300, 450][index % 4],
        y: (_, index) => 50 + Math.floor(index / 4) * 100,
        size: 50,
        color: '#f8f8f8',
        stroke: '#8b9baf',
      },
    },
    edge: {
      style: {
        color: '#1890FF',
        lineWidth: 2,
        labelFontSize: 12,
        labelMaxLines: 2,
        labelWordWrap: true,
        labelWordWrapWidth: 100,
        endArrow: true,
      },
    },
  });

  await graph.render();

  return graph;
};
