import type { GraphOptions } from '@antv/g6';
import { Graph } from '@antv/g6';

export const animationElementPosition: TestCase = async (context) => {
  const options: GraphOptions = {
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 250, y: 200 } },
        { id: 'node-2', style: { x: 250, y: 200 } },
        { id: 'node-3', style: { x: 250, y: 200 } },
        { id: 'node-4', style: { x: 250, y: 200 } },
        { id: 'node-5', style: { x: 250, y: 200 } },
        { id: 'node-6', style: { x: 250, y: 200 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-2', target: 'node-3' },
        { source: 'node-3', target: 'node-1' },
        { source: 'node-3', target: 'node-5' },
        { source: 'node-2', target: 'node-4' },
        { source: 'node-2', target: 'node-5' },
        { source: 'node-3', target: 'node-6' },
        { source: 'node-4', target: 'node-5' },
        { source: 'node-5', target: 'node-6' },
      ],
    },
    node: {
      style: {
        size: 20,
      },
    },
  };

  const graph = new Graph(options);
  await graph.render();

  const play = () => {
    graph.translateElementTo(
      {
        'node-1': [250, 100],
        'node-2': [175, 200],
        'node-3': [325, 200],
        'node-4': [100, 300],
        'node-5': [250, 300],
        'node-6': [400, 300],
      },
      true,
    );
  };
  animationElementPosition.form = (panel) => [panel.add({ play }, 'play').name('Play')];

  return graph;
};
