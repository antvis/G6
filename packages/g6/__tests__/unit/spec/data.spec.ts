import type { GraphData } from '@/src';

describe('spec data', () => {
  it('empty data', () => {
    const data: GraphData = {
      nodes: [],
      edges: [],
    };

    expect(data).toBeTruthy();
  });

  it('data', () => {
    const data: GraphData = {
      nodes: [
        {
          id: 'node1',
          data: {
            value: 1,
          },
          combo: 'combo-1',
          style: {
            collapsed: true,
            fill: 'red',
          },
        },
      ],
    };

    expect(data).toBeTruthy();
  });

  it('data with combo', () => {
    const data: GraphData = {
      nodes: [
        {
          id: 'node1',
          data: {
            value: 1,
          },
          combo: 'combo-1',
          collapsed: true,
          style: {
            fill: 'red',
          },
        },
      ],
      combos: [
        {
          id: 'combo-1',
          data: {
            value: 1,
          },
          collapsed: true,
          style: {
            fill: 'red',
          },
        },
      ],
    };

    expect(data).toBeTruthy();
  });

  it('normal data', () => {
    const data: GraphData = {
      nodes: [
        { id: 'node-1' },
        { id: 'node-2', data: { value: 1, field: 'A' } },
        { id: 'node-3', data: { value: 2 }, style: { x: 1, fill: 'red', y: 1, opacity: 0.1 } },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
          data: { value: 1, field: 'A' },
          style: { stroke: 'red' },
        },
        { id: 'edge-2', source: 'node-1', target: 'node-3' },
      ],
      combos: [
        { id: 'combo-1' },
        { id: 'combo-2', data: { value: 1, field: 'A' } },
        { id: 'combo-3', data: { value: 2 }, style: { x: 1, fill: 'red' } },
      ],
    };

    expect(data).toBeTruthy();
  });
});
