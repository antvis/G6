import { deduplicate, isEqualIgnoreOrder } from '@/src/utils/array';

describe('array', () => {
  it('deduplicate', () => {
    expect(deduplicate([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);

    expect(
      deduplicate(
        [{ id: 'node-1', data: { value: 1 } }, { id: 'node-2' }, { id: 'node-1', data: { value: 2 } }],
        (item) => item.id,
      ),
    ).toEqual(expect.arrayContaining([{ id: 'node-1', data: { value: 1 } }, { id: 'node-2' }]));
  });

  it('isEqualIgnoreOrder', () => {
    expect(isEqualIgnoreOrder([1, 2, 3], [1, 2, 3])).toEqual(true);
    expect(isEqualIgnoreOrder([1, 2, 3], [1, 3, 2])).toEqual(true);
    expect(isEqualIgnoreOrder([1, 2, 3], [1, 2])).toEqual(false);
  });
});
