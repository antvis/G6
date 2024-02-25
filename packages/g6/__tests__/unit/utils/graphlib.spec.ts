import { toG6Data, toGraphlibData } from '@/src/utils/graphlib';

describe('graphlib', () => {
  it('toGraphlibData', () => {
    expect(
      [
        { id: 'node-1' },
        { id: 'node-2', data: { value: 1 } },
        { id: 'node-3', data: { value: 2 }, style: { opacity: 0.5 } },
      ].map(toGraphlibData),
    ).toEqual([
      { id: 'node-1', data: { id: 'node-1' } },
      { id: 'node-2', data: { id: 'node-2', data: { value: 1 } } },
      { id: 'node-3', data: { id: 'node-3', data: { value: 2 }, style: { opacity: 0.5 } } },
    ]);

    expect(
      [
        { id: 'edge-1', source: 'node-1', target: 'node-2' },
        { id: 'edge-2', source: 'node-2', target: 'node-3', data: { value: 2 }, style: { fill: 'blue' } },
      ].map(toGraphlibData),
    ).toEqual([
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        data: { id: 'edge-1', source: 'node-1', target: 'node-2' },
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
        data: { id: 'edge-2', source: 'node-2', target: 'node-3', data: { value: 2 }, style: { fill: 'blue' } },
      },
    ]);
  });

  it('toG6Data', () => {
    expect(
      [
        { id: 'node-1', data: { id: 'node-1' } },
        { id: 'node-2', data: { id: 'node-2', data: { value: 1 } } },
        { id: 'node-3', data: { id: 'node-3', data: { value: 2 }, style: { opacity: 0.5 } } },
      ].map(toG6Data),
    ).toEqual([
      { id: 'node-1' },
      { id: 'node-2', data: { value: 1 } },
      { id: 'node-3', data: { value: 2 }, style: { opacity: 0.5 } },
    ]);

    expect(
      [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
          data: { id: 'edge-1', source: 'node-1', target: 'node-2' },
        },
        {
          id: 'edge-2',
          source: 'node-2',
          target: 'node-3',
          data: { id: 'edge-2', source: 'node-2', target: 'node-3', data: { value: 2 }, style: { fill: 'blue' } },
        },
      ].map(toG6Data),
    ).toEqual([
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-2', target: 'node-3', data: { value: 2 }, style: { fill: 'blue' } },
    ]);
  });
});
