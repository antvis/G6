import { getDiamondPoints } from '@/src/utils/element';
import {
  centerOf,
  deduplicate,
  findNearestLine,
  findNearestPointOnLine,
  findNearestPoints,
  getDistanceToLine,
  getEllipseIntersectPoint,
  getPolygonIntersectPoint,
  getRectIntersectPoint,
  getSymmetricPoint,
  isCollinear,
  isHorizontal,
  isOrthogonal,
  isPointInPolygon,
  isVertical,
  moveTo,
  parsePoint,
  round,
  sortByClockwise,
  sortByX,
  toPointObject,
} from '@/src/utils/point';
import { Circle, Rect } from '@antv/g';

describe('Point Functions', () => {
  it('parsePoint', () => {
    expect(parsePoint({ x: 100, y: 100 })).toEqual([100, 100, 0]);
  });

  it('toPointObject', () => {
    expect(toPointObject([100, 100])).toEqual({ x: 100, y: 100, z: 0 });
  });

  it('sortByX', () => {
    expect(
      sortByX([
        [150, 150],
        [50, 50],
        [100, 100],
      ]),
    ).toEqual([
      [50, 50],
      [100, 100],
      [150, 150],
    ]);
  });

  it('deduplicate', () => {
    expect(
      deduplicate([
        [100, 100],
        [100, 100],
        [100, 100],
      ]),
    ).toEqual([[100, 100]]);
  });

  it('sortByX', () => {
    expect(
      sortByX([
        [100, 100],
        [50, 50],
        [150, 150],
      ]),
    ).toEqual([
      [50, 50],
      [100, 100],
      [150, 150],
    ]);
  });

  it('round', () => {
    expect(round([100.123, 100.123], 2)).toEqual([100.12, 100.12]);
  });

  it('moveTo', () => {
    expect(moveTo([100, 100], [50, 100], 10)).toEqual([90, 100]);
    expect(moveTo([50, 100], [100, 100], 10)).toEqual([60, 100]);
  });

  it('isHorizontal', () => {
    expect(isHorizontal([100, 100], [50, 100])).toEqual(true);
    expect(isHorizontal([100, 100], [50, 150])).toEqual(false);
  });

  it('isVertical', () => {
    expect(isVertical([100, 100], [100, 50])).toEqual(true);
    expect(isVertical([100, 100], [50, 150])).toEqual(false);
  });

  it('isOrthogonal', () => {
    expect(isOrthogonal([100, 100], [100, 50])).toEqual(true);
    expect(isOrthogonal([100, 100], [50, 100])).toEqual(true);
  });

  it('isCollinear', () => {
    expect(isCollinear([100, 100], [100, 50], [100, 150])).toEqual(true);
    expect(isCollinear([100, 100], [50, 100], [150, 100])).toEqual(true);
    expect(isCollinear([100, 100], [50, 50], [150, 100])).toEqual(false);
  });

  it('getSymmetricPoint', () => {
    expect(getSymmetricPoint([50, 50], [100, 100])).toEqual([150, 150]);
    expect(getSymmetricPoint([-50, -50], [0, 0])).toEqual([50, 50]);
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
    expect(getRectIntersectPoint([110, 110], rect.getBounds(), true)).toEqual([100, 100]);
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
    expect(getEllipseIntersectPoint([110, 100], circle.getBounds(), true)).toEqual([99, 100]);

    const circle2 = new Circle({
      style: {
        r: 20,
      },
    });
    expect(getEllipseIntersectPoint([0, 0], circle2.getBounds())).toEqual([20, 0]);

    const circle3 = new Circle({
      style: {
        cx: 100,
        cy: 100,
        r: 20,
      },
    });
    expect(getEllipseIntersectPoint([100, 100], circle3.getBounds())).toEqual([120, 100]);
  });

  it('getDiamondIntersectPoint', () => {
    expect(getPolygonIntersectPoint([100, 100], [0, 0], getDiamondPoints(100, 100)).point).toEqual([25, 25]);
    expect(getDiamondPoints(0, 0)).toEqual([
      [0, -0],
      [0, 0],
      [0, 0],
      [-0, 0],
    ]);
    const height = 10;
    const width = 10;
    expect(getDiamondPoints(width, height)).toEqual([
      [0, -height / 2],
      [width / 2, 0],
      [0, height / 2],
      [-width / 2, 0],
    ]);
  });

  it('findNearestPoints', () => {
    expect(
      findNearestPoints(
        [
          [0, 0],
          [100, 110],
        ],
        [
          [1, 1],
          [100, 100],
        ],
      ),
    ).toEqual([
      [0, 0],
      [1, 1],
    ]);
  });

  it('isPointInPolygon', () => {
    expect(
      isPointInPolygon(
        [10, 10],
        [
          [0, 0],
          [100, 0],
          [100, 100],
          [0, 100],
        ],
      ),
    ).toEqual(true);
    expect(
      isPointInPolygon(
        [20, 20],
        [
          [0, 0],
          [10, 0],
          [10, 10],
          [0, 10],
        ],
      ),
    ).toEqual(false);
    expect(
      isPointInPolygon(
        [20, 30],
        [
          [0, 0],
          [20, 0],
          [20, 20],
          [0, 20],
        ],
      ),
    ).toEqual(false);
  });

  it('findNearestLine', () => {
    expect(
      findNearestLine(
        [10, 10],
        [
          [
            [20, 0],
            [20, 20],
          ],
          [
            [30, 0],
            [30, 30],
          ],
        ],
      ),
    ).toEqual([
      [20, 0],
      [20, 20],
    ]);
  });

  it('getDistanceToLine', () => {
    expect(
      getDistanceToLine(
        [10, 10],
        [
          [20, 0],
          [20, 20],
        ],
      ),
    ).toEqual(10);
  });

  it('findNearestPointOnLine', () => {
    expect(
      findNearestPointOnLine(
        [10, 10],
        [
          [20, 0],
          [20, 20],
        ],
      ),
    ).toEqual([20, 10]);
    expect(
      findNearestPointOnLine(
        [10, 10],
        [
          [20, 20],
          [20, 20],
        ],
      ),
    ).toEqual([20, 20]);
    expect(
      findNearestPointOnLine(
        [10, 10],
        [
          [20, 0],
          [20, 5],
        ],
      ),
    ).toEqual([20, 5]);
  });

  it('centerOf', () => {
    expect(
      centerOf([
        [0, 0],
        [100, 100],
      ]),
    ).toEqual([50, 50]);
  });

  it('sortByClockwise', () => {
    expect(
      sortByClockwise([
        [100, 100],
        [50, 50],
        [150, 150],
      ]),
    ).toEqual([
      [150, 150],
      [100, 100],
      [50, 50],
    ]);
  });
});
