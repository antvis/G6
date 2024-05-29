import type { GraphOptions } from '@antv/g6';
import { Graph } from '@antv/g6';

export const animationElementStateSwitch: TestCase = async (context) => {
  const options: GraphOptions = {
    ...context,
    data: {
      nodes: [
        { id: 'node-1', states: ['active', 'selected'], style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', states: ['active'], style: { x: 125, y: 150 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2', states: ['active'] },
        { source: 'node-2', target: 'node-3' },
        { source: 'node-3', target: 'node-1' },
      ],
    },
    theme: 'light',
    node: {
      style: {
        lineWidth: 1,
        size: 20,
      },
      state: {
        active: {
          lineWidth: 2,
        },
        selected: {
          fill: 'pink',
        },
      },
      animation: {
        update: [{ fields: ['lineWidth', 'fill'] }],
      },
    },
    edge: {
      style: {
        lineWidth: 1,
      },
      state: {
        active: {
          lineWidth: 2,
          stroke: 'pink',
        },
      },
      animation: {
        update: [
          {
            fields: ['lineWidth', 'stroke'],
          },
        ],
      },
    },
  };

  const graph = new Graph(options);
  await graph.render();

  const play = () => {
    graph.updateData({
      nodes: [
        { id: 'node-1', states: [] },
        { id: 'node-2', states: ['active'] },
        { id: 'node-3', states: ['selected'] },
      ],
      edges: [
        { source: 'node-1', target: 'node-2', states: [] },
        { source: 'node-2', target: 'node-3', states: ['active'] },
      ],
    });
    graph.draw();
  };

  animationElementStateSwitch.form = (panel) => [panel.add({ play }, 'play').name('Play')];

  return graph;
};
