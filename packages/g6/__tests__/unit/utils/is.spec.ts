import { isEdgeData, isEmpty, isVector2, isVector3 } from '../../../src/utils/is';

describe('is', () => {
  it('isEdgeData', () => {
    expect(isEdgeData({})).toBe(false);
    expect(isEdgeData({ source: 'node-1', target: 'edge-1' })).toBe(true);
  });

  it('isVector2', () => {
    expect(isVector2([1, 2])).toBe(true);
    expect(isVector2([1, 2, 3])).toBe(false);
  });

  it('isVector3', () => {
    expect(isVector3([1, 2, 3])).toBe(true);
    expect(isVector3([1, 2])).toBe(false);
  });

  it('isEmpty', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty('')).toBe(true);

    expect(isEmpty(0)).toBe(false);
    expect(isEmpty('Y')).toBe(false);
    expect(isVector3([1, 2])).toBe(false);
  });
});
