import { idOf, idsOf, parentIdOf } from '@/src/utils/id';

describe('id', () => {
  it('idOf', () => {
    expect(idOf({ id: '1' })).toBe('1');
    expect(idOf({ source: 'node-1', target: 'edge-1' })).toBe(`node-1-edge-1`);
    expect(() => idOf({})).toThrow();
  });

  it('parentIdOf', () => {
    expect(parentIdOf({ combo: '1' })).toBe('1');
    expect(parentIdOf({})).toBeUndefined();
  });

  it('idsOf', () => {
    expect(idsOf({ nodes: [{ id: '1' }, { id: '2' }], edges: [{ source: '1', target: '2' }] }, true)).toEqual([
      '1',
      '2',
      '1-2',
    ]);
    expect(idsOf({}, true)).toEqual([]);
    expect(idsOf({ nodes: [{ id: '1' }, { id: '2' }], edges: [{ source: '1', target: '2' }] }, false)).toEqual({
      nodes: ['1', '2'],
      edges: ['1-2'],
      combos: [],
    });
    expect(idsOf({}, false)).toEqual({ nodes: [], edges: [], combos: [] });
  });
});
