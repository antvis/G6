import type { G6Spec } from '@/src';
import { Graph } from '@/src';

export const animationElementStateSwitch: TestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50, states: ['active', 'selected'] } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', style: { x: 125, y: 150, states: ['active'] } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2', style: { states: ['active'] } },
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
          color: 'pink',
        },
      },
      animation: {
        update: [{ fields: ['lineWidth', 'color'] }],
      },
    },
    edge: {
      style: {
        lineWidth: 1,
      },
      state: {
        active: {
          lineWidth: 2,
          color: 'pink',
        },
      },
      animation: {
        update: [
          {
            fields: ['lineWidth', 'color'],
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
        { id: 'node-1', style: { states: [] } },
        { id: 'node-2', style: { states: ['active'] } },
        { id: 'node-3', style: { states: ['selected'] } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2', style: { states: [] } },
        { source: 'node-2', target: 'node-3', style: { states: ['active'] } },
      ],
    });
    graph.draw();
  };

  animationElementStateSwitch.form = (panel) => [panel.add({ play }, 'play').name('Play')];

  return graph;
};
