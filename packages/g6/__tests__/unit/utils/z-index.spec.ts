import { getZIndexOf } from '@/src/utils/z-index';

describe('z-index', () => {
  it('getZIndexOf', () => {
    expect(getZIndexOf({ id: 'node-1' })).toBe(0);
    expect(getZIndexOf({ id: 'node-1', style: {} })).toBe(0);
    expect(getZIndexOf({ id: 'node-1', style: { zIndex: 1 } })).toBe(1);
  });
});
