import { deduplicate } from '@/src/utils/array';

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
});
