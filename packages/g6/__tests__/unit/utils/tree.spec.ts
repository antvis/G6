import { treeToGraphData } from '@/src/utils/tree';

describe('tree', () => {
  it('treeToGraphData', () => {
    expect(
      treeToGraphData({
        id: 'root',
        children: [{ id: 'child' }],
      }),
    ).toEqual({
      nodes: [
        {
          id: 'root',
          depth: 0,
          children: ['child'],
        },
        { id: 'child', depth: 1 },
      ],
      edges: [{ source: 'root', target: 'child' }],
    });

    expect(
      treeToGraphData({
        id: 'root',
        style: { fill: 'red' },
        data: { value: 10 },
        children: [{ id: 'child', style: { fill: 'green' }, data: { value: 1 } }],
      }),
    ).toEqual({
      nodes: [
        {
          id: 'root',
          children: ['child'],
          depth: 0,
          style: { fill: 'red' },
          data: { value: 10 },
        },
        { id: 'child', depth: 1, style: { fill: 'green' }, data: { value: 1 } },
      ],
      edges: [{ source: 'root', target: 'child' }],
    });

    expect(
      treeToGraphData(
        {
          id: 'root',
          style: { fill: 'red' },
          data: { value: 10 },
          children: [{ id: 'child', style: { fill: 'green' }, data: { value: 1 } }],
        },
        {
          getEdgeData: (source, target) => ({
            source: source.id,
            target: target.id,
            data: { weight: source.data.value + target.data.value },
          }),
        },
      ),
    ).toEqual({
      nodes: [
        {
          id: 'root',
          children: ['child'],
          depth: 0,
          style: { fill: 'red' },
          data: { value: 10 },
        },
        { id: 'child', depth: 1, style: { fill: 'green' }, data: { value: 1 } },
      ],
      edges: [{ source: 'root', target: 'child', data: { weight: 11 } }],
    });
  });
});
