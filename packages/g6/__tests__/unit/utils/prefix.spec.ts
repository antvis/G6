import {
  addPrefix,
  omitStyleProps,
  removePrefix,
  replacePrefix,
  startsWith,
  subObject,
  subStyleProps,
} from '@/src/utils/prefix';

describe('prefix', () => {
  it('addPrefix', () => {
    expect(addPrefix('abc', 'prefix')).toBe('prefixAbc');
    expect(addPrefix('Abc', 'prefix')).toBe('prefixAbc');
    expect(addPrefix('', 'prefix')).toBe('prefix');
  });

  it('removePrefix', () => {
    expect(removePrefix('prefixAbc', 'prefix')).toBe('abc');
    expect(removePrefix('prefixAbc', 'prefix', false)).toBe('Abc');
    expect(removePrefix('Abc', 'prefix')).toBe('Abc');
    expect(removePrefix('', 'prefix')).toBe('');
    expect(removePrefix('prefix', '')).toBe('prefix');
    expect(removePrefix('prefixAbc', '')).toBe('prefixAbc');
  });

  it('startsWith', () => {
    expect(startsWith('prefixAbc', 'prefix')).toBe(true);
    expect(startsWith('prefixAbc', 'prefix')).toBe(true);
    expect(startsWith('Abc', 'prefix')).toBe(false);
    expect(startsWith('', 'prefix')).toBe(false);
    expect(startsWith('prefix', 'prefix')).toBe(false);
  });

  it('subStyleProps', () => {
    expect(subStyleProps({ prefixAbc: 1, prefixDef: 2, Abc: 3 }, 'prefix')).toEqual({ abc: 1, def: 2 });
    expect(subStyleProps({ Abc: 1, Def: 2 }, 'prefix')).toEqual({});
    expect(subStyleProps({}, 'prefix')).toEqual({});
    expect(subStyleProps({ prefixAbc: 1, className: 3, class: 2 }, 'prefix')).toEqual({ abc: 1 });
  });

  it('subObject', () => {
    expect(subObject({ ab: 1, ac: 2, bc: 3 }, 'a')).toEqual({ b: 1, c: 2 });
    expect(subObject({ ab: 1, ac: 2, bc: 3 }, 'b')).toEqual({ c: 3 });
  });

  it('omitStyleProps', () => {
    expect(omitStyleProps({ prefixAbc: 1, prefixDef: 2, Abc: 3 }, 'prefix')).toEqual({ Abc: 3 });
    expect(omitStyleProps({ Abc: 1, Def: 2 }, 'prefix')).toEqual({ Abc: 1, Def: 2 });
    expect(omitStyleProps({}, 'prefix')).toEqual({});
    expect(omitStyleProps({ prefixAbc: 1, prefixDef: 2, labelAbc: 3 }, ['prefix', 'label'])).toEqual({});
  });

  it('replacePrefix', () => {
    expect(replacePrefix({ prefixAbc: 1, prefixDef: 2, Abc: 3 }, 'prefix', 'newPrefix')).toEqual({
      newPrefixAbc: 1,
      newPrefixDef: 2,
      Abc: 3,
    });
    expect(replacePrefix({ Abc: 1, Def: 2 }, 'prefix', 'newPrefix')).toEqual({ Abc: 1, Def: 2 });
    expect(replacePrefix({}, 'prefix', 'newPrefix')).toEqual({});
  });
});
