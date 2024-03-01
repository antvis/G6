import { calculateCollapsedOrigin } from '@/src/utils/combo';

describe('combo', () => {
  it('calculateCollapsedOrigin', () => {
    expect(calculateCollapsedOrigin('top', [100, 100], [200, 200])).toEqual([0.5, 0.25]);
    expect(calculateCollapsedOrigin('bottom', [100, 100], [200, 200])).toEqual([0.5, 0.75]);
    expect(calculateCollapsedOrigin('left', [100, 100], [200, 200])).toEqual([0.25, 0.5]);
    expect(calculateCollapsedOrigin('right', [100, 100], [200, 200])).toEqual([0.75, 0.5]);
  });
});
