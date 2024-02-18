import { transformTreeDataToGraphData } from '../../../src/utils/tree';

describe('tree', () => {
  it('transformTreeDataToGraphData', () => {
    expect(
      transformTreeDataToGraphData({
        id: 'root',
        children: [{ id: 'child' }],
      }),
    ).toEqual({
      nodes: [
        {
          id: 'root',
          style: {
            children: ['child'],
          },
        },
        { id: 'child' },
      ],
      edges: [{ source: 'root', target: 'child' }],
    });

    expect(
      transformTreeDataToGraphData({
        id: 'root',
        style: { fill: 'red' },
        data: { value: 10 },
        children: [{ id: 'child', style: { fill: 'green' }, data: { value: 1 } }],
      }),
    ).toEqual({
      nodes: [
        {
          id: 'root',
          style: { fill: 'red', children: ['child'] },
          data: { value: 10 },
        },
        { id: 'child', style: { fill: 'green' }, data: { value: 1 } },
      ],
      edges: [{ source: 'root', target: 'child' }],
    });

    expect(
      transformTreeDataToGraphData(
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
          style: { fill: 'red', children: ['child'] },
          data: { value: 10 },
        },
        { id: 'child', style: { fill: 'green' }, data: { value: 1 } },
      ],
      edges: [{ source: 'root', target: 'child', data: { weight: 11 } }],
    });
  });
});
