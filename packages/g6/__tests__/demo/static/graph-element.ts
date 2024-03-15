import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import type { STDTestCase } from '../types';

export const graphElement: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 100, fill: 'red', stroke: 'pink', lineWidth: 1 }, data: { value: 100 } },
        { id: 'node-2', style: { x: 150, y: 100 }, data: { value: 150 } },
        { id: 'node-3', style: { x: 125, y: 150, parentId: 'combo-1', states: ['selected'] }, data: { value: 150 } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 250 } },
        {
          id: 'edge-2',
          source: 'node-2',
          target: 'node-3',
          style: { lineWidth: 5, states: ['active', 'selected'] },
          data: { weight: 300 },
        },
      ],
      combos: [{ id: 'combo-1' }],
    },
    node: {
      style: {
        fill: (datum: any) => (datum?.data?.value > 100 ? 'red' : 'blue'),
        border: (datum: any, index: number, data: any) => (index % 2 === 0 ? 0 : 10),
      },
      state: {
        selected: {
          fill: (datum: any) => (datum?.data?.value > 100 ? 'purple' : 'cyan'),
        },
      },
      palette: 'spectral',
    },
    edge: {
      style: {},
      state: {
        selected: {
          stroke: 'red',
        },
        active: {
          stroke: 'pink',
          lineWidth: 4,
        },
      },
      palette: { type: 'group', color: 'oranges', field: (d: any) => d.id, invert: true },
    },
    combo: {
      style: {},
      state: {},
      palette: 'blues',
    },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
