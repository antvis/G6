import { isEdgeData, isPoint, isVector2, isVector3 } from '@/src/utils/is';

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

  it('isPoint', () => {
    expect(isPoint([1, 2])).toBe(true);
    expect(isPoint([1, 2, 3])).toBe(true);
    expect(isPoint(new Float32Array([1, 2, 3]))).toBe(true);
    expect(isPoint([1, '2'])).toBe(false);
  });
});
