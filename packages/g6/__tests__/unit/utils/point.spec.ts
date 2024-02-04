import { Circle, Rect } from '@antv/g';
import {
  getEllipseIntersectPoint,
  getLinesIntersection,
  getRectIntersectPoint,
  isCollinear,
  isHorizontal,
  isLinesParallel,
  isSamePoint,
  isVertical,
  parsePoint,
} from '../../../src/utils/point';

describe('Point Functions', () => {
  it('parsePoint', () => {
    expect(parsePoint({ x: 100, y: 100 })).toEqual([100, 100]);
  });

  it('isHorizontal', () => {
    expect(isHorizontal([100, 100], [50, 100])).toEqual(true);
    expect(isHorizontal([100, 100], [50, 150])).toEqual(false);
  });

  it('isVertical', () => {
    expect(isVertical([100, 100], [100, 50])).toEqual(true);
    expect(isVertical([100, 100], [50, 150])).toEqual(false);
  });

  it('isCollinear', () => {
    expect(isCollinear([100, 100], [100, 50], [100, 150])).toEqual(true);
    expect(isCollinear([100, 100], [50, 100], [150, 100])).toEqual(true);
    expect(isCollinear([100, 100], [50, 50], [150, 100])).toEqual(false);
  });

  it('isSamePoint', () => {
    expect(isSamePoint([100, 100], [100, 100])).toEqual(true);
    expect(isSamePoint([100, 100], [50, 100])).toEqual(false);
    expect(isSamePoint([100, 100, 100], [100, 100])).toEqual(false);
    expect(isSamePoint([100, 100, 100], [100, 100, 100])).toEqual(true);
  });

  it('isLinesParallel', () => {
    expect(
      isLinesParallel(
        [
          [100, 100],
          [100, 50],
        ],
        [
          [100, 150],
          [100, 200],
        ],
      ),
    ).toEqual(true);
    expect(
      isLinesParallel(
        [
          [100, 100],
          [100, 50],
        ],
        [
          [100, 150],
          [150, 200],
        ],
      ),
    ).toEqual(false);
  });

  it('getLinesIntersection', () => {
    expect(
      getLinesIntersection(
        [
          [100, 0],
          [100, 200],
        ],
        [
          [0, 100],
          [200, 100],
        ],
      ),
    ).toEqual([100, 100]);
    expect(
      getLinesIntersection(
        [
          [100, 0],
          [100, 200],
        ],
        [
          [0, 100],
          [50, 300],
        ],
      ),
    ).toEqual(undefined);
  });

  it('getRectIntersectPoint', () => {
    const rect = new Rect({
      style: {
        x: 100,
        y: 100,
        width: 2,
        height: 2,
      },
    });
    expect(getRectIntersectPoint([110, 110], rect.getBounds())).toEqual([102, 102]);
  });

  it('getEllipseIntersectPoint', () => {
    const circle = new Circle({
      style: {
        cx: 100,
        cy: 100,
        r: 1,
      },
    });
    expect(getEllipseIntersectPoint([110, 100], circle.getBounds())).toEqual([101, 100]);
  });
});
