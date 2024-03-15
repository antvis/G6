import { Graph } from '@/src';
import type { STDTestCase } from '../types';

export const elementPositionCombo: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 150, parentId: 'combo-1' } },
        { id: 'node-2', style: { x: 200, y: 150, parentId: 'combo-1' } },
        { id: 'node-3', style: { x: 400, y: 200, parentId: 'combo-2' } },
        { id: 'node-4', style: { x: 150, y: 300, parentId: 'combo-3' } },
      ],
      combos: [
        { id: 'combo-1', style: { parentId: 'combo-2' } },
        { id: 'combo-2' },
        { id: 'combo-3', style: { parentId: 'combo-1' } },
      ],
    },
    node: {
      style: {
        size: 20,
        labelWordWrapWidth: 200,
        labelText: (d) => d.id,
      },
    },
    combo: {
      style: {
        labelText: (d) => d.id,
      },
    },
    padding: 20,
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
