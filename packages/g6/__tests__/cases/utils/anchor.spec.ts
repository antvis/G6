import { parseAnchor } from '@/src/utils/anchor';
import { getXYByAnchor } from '@/src/utils/position';
import { AABB } from '@antv/g';

describe('anchor', () => {
  it('parseAnchor', () => {
    expect(parseAnchor([0.5, 0.5])).toEqual([0.5, 0.5]);
    expect(parseAnchor('0.5 0.5')).toEqual([0.5, 0.5]);
    expect(parseAnchor('1.8 1.8')).toEqual([0.5, 0.5]);
  });

  it('getXYByAnchor', () => {
    const bbox = new AABB();
    bbox.setMinMax([0, 0, 0], [100, 100, 0]);
    expect(getXYByAnchor(bbox, [0.5, 0.5])).toEqual([50, 50]);
    expect(getXYByAnchor(bbox, '0.5 0.5')).toEqual([50, 50]);
    expect(getXYByAnchor(bbox, [0.25, 0.25])).toEqual([25, 25]);
  });
});
