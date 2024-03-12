import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import type { STDTestCase } from '../types';

export const controllerElementVisibility: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', style: { x: 125, y: 150, opacity: 0.5 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-2', target: 'node-3', style: { opacity: 0.5 } },
        { source: 'node-3', target: 'node-1' },
      ],
    },
    theme: 'light',
    node: {
      style: {
        size: 20,
      },
    },
  };

  const graph = new Graph(options);
  await graph.render();

  const show = () => graph.showElement(['node-3', 'node-2-node-3', 'node-3-node-1']);
  const hide = () => graph.hideElement(['node-3', 'node-2-node-3', 'node-3-node-1']);

  controllerElementVisibility.form = (panel) => [panel.add({ show }, 'show'), panel.add({ hide }, 'hide')];

  return graph;
};
