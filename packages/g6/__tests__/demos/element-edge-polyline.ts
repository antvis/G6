import { Graph } from '@antv/g6';

export const elementEdgePolyline: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-0', style: { x: 50, y: 40, labelText: 'Loop' } },
        {
          id: 'node-0-1',
          style: {
            x: 150,
            y: 40,
            labelText: 'Loop',
            port: true,
            ports: [
              { key: 'top', placement: [0, 0.5], r: 2, fill: '#31d0c6' },
              {
                key: 'left',
                placement: [0.5, 0],
                r: 2,
                fill: '#31d0c6',
              },
            ],
          },
        },
        {
          id: 'node-0-2',
          style: {
            x: 250,
            y: 40,
            labelText: 'Loop',
            port: true,
            ports: [{ key: 'top', placement: [0.5, 0], r: 2, fill: '#31d0c6' }],
          },
        },
        {
          id: 'node-1',
          style: { x: 50, y: 120, labelText: '1' },
        },
        {
          id: 'node-2',
          style: { x: 150, y: 75, labelText: '2' },
        },
        {
          id: 'node-3',
          style: { x: 50, y: 220, labelText: '3' },
        },
        {
          id: 'node-4',
          style: { x: 150, y: 175, labelText: '4' },
        },
        {
          id: 'control-point-1',
          type: 'circle',
          style: { x: 100, y: 175, size: 4 },
        },
        {
          id: 'node-5',
          style: { x: 50, y: 320, labelText: '5' },
        },
        {
          id: 'node-6',
          style: { x: 150, y: 275, labelText: '6' },
        },
        {
          id: 'control-point-2',
          type: 'circle',
          style: { x: 100, y: 300, size: 4 },
        },
        {
          id: 'node-7',
          style: { x: 50, y: 420, labelText: '7', ports: [{ key: 'top', placement: [0.3, 0], r: 2, fill: '#31d0c6' }] },
        },
        {
          id: 'node-8',
          style: { x: 150, y: 375, labelText: '8' },
        },
        {
          id: 'node-9',
          style: { x: 250, y: 420, labelText: '9' },
        },
        {
          id: 'node-10',
          style: { x: 350, y: 375, labelText: '10', size: 50 },
        },
        {
          id: 'control-point-3',
          type: 'circle',
          style: { x: 340, y: 390, size: 4 },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'node-0',
          target: 'node-0',
          style: { loopPlacement: 'top' },
        },
        {
          id: 'edge-2',
          source: 'node-0',
          target: 'node-0',
          style: { loopPlacement: 'bottom-right' },
        },
        {
          source: 'node-0-1',
          target: 'node-0-1',
          style: { sourcePort: 'top', targetPort: 'left', loopPlacement: 'bottom-left' },
        },
        {
          source: 'node-0-2',
          target: 'node-0-2',
          style: { sourcePort: 'top' },
        },
        {
          source: 'node-1',
          target: 'node-2',
          style: { router: { type: 'orth' } },
        },
        {
          source: 'node-3',
          target: 'node-4',
          style: { router: false, controlPoints: [[100, 175]] },
        },
        {
          source: 'node-5',
          target: 'node-6',
          style: { router: { type: 'orth' }, controlPoints: [[100, 300]] },
        },
        {
          source: 'node-7',
          target: 'node-8',
          style: { router: { type: 'orth' } },
        },
        {
          source: 'node-9',
          target: 'node-10',
          style: { router: { type: 'orth' }, controlPoints: [[340, 390]] },
        },
      ],
    },
    node: {
      type: (d) => d.type || 'rect',
      style: {
        size: (d) => d.style?.size || [50, 20],
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
        labelPlacement: 'center',
        labelFill: '#8b9baf',
        portLineWidth: 0,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        stroke: '#1890FF',
      },
    },
  });

  await graph.render();

  return graph;
};
