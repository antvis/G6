import { AABB } from '@antv/g';
import { getBBoxHeight, getBBoxWidth } from '../../../src/utils/bbox';

describe('bbox', () => {
  const aabb = new AABB();
  aabb.setMinMax([0, 0, 0], [1, 1, 1]);

  it('getBBoxWidth', () => {
    expect(getBBoxWidth(aabb)).toBe(1);
  });

  it('getBBoxHeight', () => {
    expect(getBBoxHeight(aabb)).toBe(1);
  });
});
