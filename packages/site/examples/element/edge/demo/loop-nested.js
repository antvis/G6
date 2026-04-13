import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 150, y: 150 } },
    { id: 'node2', style: { x: 400, y: 150 } },
    { id: 'node3', style: { x: 275, y: 300 } },
  ],
  edges: [
    // Node 1: 3 nested loops at 'top' position with different colors
    { id: 'loop-1', source: 'node1', target: 'node1', style: { loopPlacement: 'top', stroke: '#5B8FF9' } },
    { id: 'loop-2', source: 'node1', target: 'node1', style: { loopPlacement: 'top', stroke: '#5AD8A6' } },
    { id: 'loop-3', source: 'node1', target: 'node1', style: { loopPlacement: 'top', stroke: '#F6BD16' } },
    // Node 2: nested loops at different positions
    { id: 'loop-4', source: 'node2', target: 'node2', style: { loopPlacement: 'right', stroke: '#E86452' } },
    { id: 'loop-5', source: 'node2', target: 'node2', style: { loopPlacement: 'right', stroke: '#6DC8EC' } },
    { id: 'loop-6', source: 'node2', target: 'node2', style: { loopPlacement: 'bottom', stroke: '#945FB9' } },
    { id: 'loop-7', source: 'node2', target: 'node2', style: { loopPlacement: 'bottom', stroke: '#FF9C6E' } },
    // Node 3: mixed - some nested, some spread
    { id: 'loop-8', source: 'node3', target: 'node3', style: { loopPlacement: 'left', stroke: '#5B8FF9' } },
    { id: 'loop-9', source: 'node3', target: 'node3', style: { loopPlacement: 'left', stroke: '#5AD8A6' } },
    { id: 'loop-10', source: 'node3', target: 'node3', style: { loopPlacement: 'top-right', stroke: '#F6BD16' } },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'circle',
    style: {
      size: 60,
      labelText: (d) => d.id,
    },
  },
  edge: {
    type: 'quadratic',
    style: {
      endArrow: true,
      lineWidth: 2,
      labelText: (d) => d.id,
      labelFill: '#333',
      labelFontSize: 12,
      labelOffsetY: -10,
      labelBackground: true,
      labelBackgroundFill: '#fff',
      labelBackgroundOpacity: 0.9,
      labelBackgroundRadius: 4,
      labelPadding: [2, 4],
    },
  },
  transforms: [
    {
      type: 'process-parallel-edges',
      loopMode: 'nested', // Enable nested mode for self-loops
      loopDistance: 30, // Distance between nested loops
    },
  ],
});

graph.render();