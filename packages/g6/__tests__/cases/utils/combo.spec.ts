import { getCircleCollapsedOrigin, getRectCollapsedOrigin, getXYByCollapsedOrigin } from '@/src/utils/combo';

describe('combo', () => {
  it('getRectCollapsedOrigin', () => {
    expect(getRectCollapsedOrigin('top', [100, 100], [200, 200])).toEqual([0.5, 0.25]);
    expect(getRectCollapsedOrigin('bottom', [100, 100], [200, 200])).toEqual([0.5, 0.75]);
    expect(getRectCollapsedOrigin('left', [100, 100], [200, 200])).toEqual([0.25, 0.5]);
    expect(getRectCollapsedOrigin('right', [100, 100], [200, 200])).toEqual([0.75, 0.5]);
    expect(getRectCollapsedOrigin('center', [100, 100], [200, 200])).toEqual([0.5, 0.5]);
    expect(getRectCollapsedOrigin('top-left', [100, 100], [200, 200])).toEqual([0.25, 0.25]);
    expect(getRectCollapsedOrigin('top-right', [100, 100], [200, 200])).toEqual([0.75, 0.25]);
    expect(getRectCollapsedOrigin('bottom-left', [100, 100], [200, 200])).toEqual([0.25, 0.75]);
    expect(getRectCollapsedOrigin('bottom-right', [100, 100], [200, 200])).toEqual([0.75, 0.75]);
    expect(getRectCollapsedOrigin([0.5, 0.5], [100, 100], [200, 200])).toEqual([0.5, 0.5]);
  });

  it('getCircleCollapsedOrigin', () => {
    expect(getCircleCollapsedOrigin('top', [100, 100], [200, 200])).toEqual([0.5, 0.25]);
    expect(getCircleCollapsedOrigin('bottom', [100, 100], [200, 200])).toEqual([0.5, 0.75]);
    expect(getCircleCollapsedOrigin('left', [100, 100], [200, 200])).toEqual([0.25, 0.5]);
    expect(getCircleCollapsedOrigin('right', [100, 100], [200, 200])).toEqual([0.75, 0.5]);
    expect(getCircleCollapsedOrigin('center', [100, 100], [200, 200])).toEqual([0.5, 0.5]);
    expect(getCircleCollapsedOrigin([0.5, 0.5], [100, 100], [200, 200])).toEqual([0.5, 0.5]);
  });

  it('getXYByCollapsedOrigin', () => {
    expect(getXYByCollapsedOrigin('top', [100, 100], [100, 100], [200, 200])).toEqual([100, 50]);
    expect(getXYByCollapsedOrigin('bottom', [100, 100], [100, 100], [200, 200])).toEqual([100, 150]);
    expect(getXYByCollapsedOrigin('left', [100, 100], [100, 100], [200, 200])).toEqual([50, 100]);
    expect(getXYByCollapsedOrigin('right', [100, 100], [100, 100], [200, 200])).toEqual([150, 100]);
    expect(getXYByCollapsedOrigin('center', [100, 100], [100, 100], [200, 200])).toEqual([100, 100]);
    expect(getXYByCollapsedOrigin([0.5, 0.5], [100, 100], [100, 100], [200, 200])).toEqual([100, 100]);
  });
});
