import { Graph } from '@/src';
import type { STDTestCase } from '../types';

export const comboCircle: STDTestCase = async (context) => {
  const data = {
    nodes: [
      { id: 'node-1', data: {}, style: { parentId: 'combo-2', x: 100, y: 100 } },
      { id: 'node-2', data: {}, style: { parentId: 'combo-1', x: 300, y: 200 } },
      { id: 'node-3', data: {}, style: { parentId: 'combo-1', x: 200, y: 300 } },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-2', target: 'node-3' },
    ],
    combos: [
      {
        id: 'combo-1',
        style: { parentId: 'combo-2' },
      },
      {
        id: 'combo-2',
        style: {
          zIndex: -10, // TODO: zIndex?
        },
      },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d: any) => d.id,
      },
    },
    combo: {
      style: {
        padding: 0,
        contentType: 'childCount',
        labelText: (d: any) => d.id,
      },
    },
  });

  await graph.render();

  return graph;
};
