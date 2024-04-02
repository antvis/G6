import { getIds, idOf, parentIdOf } from '@/src/utils/id';

describe('id', () => {
  it('idOf', () => {
    expect(idOf({ id: '1' })).toBe('1');
    expect(idOf({ id: 1 })).toBe(1);
    expect(idOf({ source: 'node-1', target: 'edge-1' })).toBe(`node-1-edge-1`);
    expect(() => idOf({})).toThrow();
  });

  it('parentIdOf', () => {
    expect(parentIdOf({ style: { parentId: '1' } })).toBe('1');
    expect(parentIdOf({})).toBeUndefined();
  });

  it('getIds', () => {
    expect(getIds({ nodes: [{ id: '1' }, { id: '2' }], edges: [{ source: '1', target: '2' }] })).toEqual([
      '1',
      '2',
      '1-2',
    ]);
    expect(getIds({})).toEqual([]);
  });
});
