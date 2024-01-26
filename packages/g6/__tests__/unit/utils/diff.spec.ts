import { arrayDiff } from '../../../src/utils/diff';

describe('diff', () => {
  it('array diff simple', () => {
    const original = [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }];
    const modified = [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-4' }];
    const key = (d: { id: string }) => d.id;

    const { enter, update, exit, keep } = arrayDiff(original, modified, key);

    expect(enter).toEqual([{ id: 'node-4' }]);
    expect(update).toEqual([]);
    expect(exit).toEqual([{ id: 'node-3' }]);
    expect(keep).toEqual([{ id: 'node-1' }, { id: 'node-2' }]);
  });

  it('array diff', () => {
    const original = [
      { id: 'node-1' },
      { id: 'node-2', data: { value: 1 } },
      { id: 'node-3', data: { value: 2 }, style: { fill: 'red' } },
    ];

    const modified = [
      { id: 'node-1' },
      { id: 'node-2', data: { value: 2 } },
      { id: 'node-4', data: { value: 3 }, style: { fill: 'red' } },
    ];
    const key = (d: { id: string }) => d.id;

    const { enter, update, exit, keep } = arrayDiff(original, modified, key);

    expect(enter).toEqual([{ id: 'node-4', data: { value: 3 }, style: { fill: 'red' } }]);
    expect(update).toEqual([{ id: 'node-2', data: { value: 2 } }]);
    expect(exit).toEqual([{ id: 'node-3', data: { value: 2 }, style: { fill: 'red' } }]);
    expect(keep).toEqual([{ id: 'node-1' }]);
  });
});
