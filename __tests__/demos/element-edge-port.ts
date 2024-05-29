import { Graph } from '@antv/g6';

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
      sourcePort: 'bottom',
      labelText: 'sourcePort✅ targetPort❓',
    },
  };

  const graph = new Graph({
    ...context,
    data: {
      nodes: Array.from({ length: 20 }).map((_, i) => ({
        id: `node-${i}`,
        data: { index: i },
        type: i === 19 ? 'star' : 'circle',
        style: nodes[`node-${i}`] || {},
      })),
      edges: Array.from({ length: 10 }).map((_, i) => ({
        id: `edge-${i}`,
        source: `node-${i * 2}`,
        target: `node-${i * 2 + 1}`,
        type: i === 9 ? 'cubic' : 'line',
        style: edges[`edge-${i}`] || {},
      })),
    },
    node: {
      style: {
        x: (d) => [50, 200, 300, 450][(d.data!.index as number) % 4],
        y: (d) => 50 + Math.floor((d.data!.index as number) / 4) * 100,
        size: 50,
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
      },
    },
    edge: {
      style: {
        stroke: '#1890FF',
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
