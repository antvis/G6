import { Circle, CircleCombo } from '@/src/elements';
import {
  calculateCollapsedOrigin,
  getCollapsedMarkerText,
  getDescendantCount,
  getXYByCollapsedOrigin,
} from '@/src/utils/combo';

describe('combo', () => {
  it('calculateCollapsedOrigin', () => {
    expect(calculateCollapsedOrigin('top', [100, 100], [200, 200])).toEqual([0.5, 0.25]);
    expect(calculateCollapsedOrigin('bottom', [100, 100], [200, 200])).toEqual([0.5, 0.75]);
    expect(calculateCollapsedOrigin('left', [100, 100], [200, 200])).toEqual([0.25, 0.5]);
    expect(calculateCollapsedOrigin('right', [100, 100], [200, 200])).toEqual([0.75, 0.5]);
    expect(calculateCollapsedOrigin('center', [100, 100], [200, 200])).toEqual([0.5, 0.5]);
    expect(calculateCollapsedOrigin([0.5, 0.5], [100, 100], [200, 200])).toEqual([0.5, 0.5]);
  });

  it('getXYByCollapsedOrigin', () => {
    expect(getXYByCollapsedOrigin('top', [100, 100], [100, 100], [200, 200])).toEqual([100, 50]);
    expect(getXYByCollapsedOrigin('bottom', [100, 100], [100, 100], [200, 200])).toEqual([100, 150]);
    expect(getXYByCollapsedOrigin('left', [100, 100], [100, 100], [200, 200])).toEqual([50, 100]);
    expect(getXYByCollapsedOrigin('right', [100, 100], [100, 100], [200, 200])).toEqual([150, 100]);
    expect(getXYByCollapsedOrigin('center', [100, 100], [100, 100], [200, 200])).toEqual([100, 100]);
    expect(getXYByCollapsedOrigin([0.5, 0.5], [100, 100], [100, 100], [200, 200])).toEqual([100, 100]);
  });

  it('getCollapsedMarkerText', () => {
    const children = [new CircleCombo({ style: { children: [new Circle({})] } })];
    expect(getCollapsedMarkerText('childCount', children)).toEqual('1');
    expect(getCollapsedMarkerText('descendantCount', children)).toEqual('2');
    expect(getCollapsedMarkerText('nodeCount', children)).toEqual('1');
  });

  it('getDescendantCount', () => {
    expect(getDescendantCount([new Circle({}), new Circle({})])).toEqual(2);
    expect(getDescendantCount([new CircleCombo({ style: { children: [new Circle({})] } })])).toEqual(2);
    expect(getDescendantCount([new CircleCombo({ style: { children: [new Circle({})] } })], true)).toEqual(1);
  });
});
