import type { NodeData } from '@/src';
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
      { id: 'node-1', data: { id: 'node-1', data: {}, style: {} } },
      { id: 'node-2', data: { id: 'node-2', data: { value: 1 }, style: {} } },
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
        data: { id: 'edge-1', source: 'node-1', target: 'node-2', data: {}, style: {} },
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
        data: { id: 'edge-2', source: 'node-2', target: 'node-3', data: { value: 2 }, style: { fill: 'blue' } },
      },
    ]);
  });

  it('data isolation', () => {
    const raw: NodeData = {
      id: 'node-3',
      data: { basic: 2, array: [1, 2, 3], object: { a: 1 } },
      style: { x: 100, y: 100, opacity: 0.5, size: [100, 100] },
    };
    const graphlibData = toGraphlibData(raw);

    expect(graphlibData.data).toEqual(raw);

    Object.assign(graphlibData.data.data!, { basic: 3, array: [4, 5, 6], object: { b: 2 } });

    expect(raw.data).toEqual({ basic: 2, array: [1, 2, 3], object: { a: 1 } });
    expect(graphlibData.data.data).toEqual({ basic: 3, array: [4, 5, 6], object: { b: 2 } });

    graphlibData.data.style!.x = 200;
    graphlibData.data.style!.size = [200, 200];

    expect(raw.style).toEqual({ x: 100, y: 100, opacity: 0.5, size: [100, 100] });
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
