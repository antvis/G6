import { getControlPoint, getSpline, pointsToPolygon } from '../../../src/util/path';

describe('Path Util Test', () => {
  it('getSpline', () => {
    const points = [
      {
        x: 10,
        y: 12,
      },
      {
        x: 5,
        y: 5,
      },
      {
        x: 2,
        y: 7,
      },
    ];

    const splinePath = getSpline(points);

    expect(splinePath.length).toEqual(3);
    const first = splinePath[0];
    expect(first.length).toEqual(3);
    expect(first[0]).toEqual('M');
    expect(first[1]).toEqual(10);
    expect(first[2]).toEqual(12);

    const second = splinePath[1];
    expect(second.length).toEqual(7);
    expect(second[0]).toEqual('C');
    expect(second[1]).toEqual(9.166666666666666);
    expect(second[2]).toEqual(10.833333333333334);
    expect(second[5]).toEqual(5);

    const three = splinePath[2];
    expect(three.length).toEqual(7);
    expect(three[2]).toEqual(4.166666666666667);
    expect(three[6]).toEqual(7);
  });

  it('getSpline thorw new error', () => {
    const points = [
      {
        x: 10,
        y: 12,
      },
    ];

    expect(() => getSpline(points)).toThrowError(
      `point length must largn than 2, now it's ${points.length}`,
    );
  });

  it('getControlPoint horizontal', () => {
    const start = { x: 0, y: 0 };
    const end = { x: 100, y: 0 };

    const controlPoint = getControlPoint(start, end, 0.5, 10);

    expect(controlPoint.x).toEqual(50);
    expect(controlPoint.y).toEqual(10);

    const points = getControlPoint(start, end, 0.2, -2);
    expect(points).toEqual({ x: 20, y: -2 });
  });

  it('getControlPoint vertical', () => {
    const start = { x: 0, y: 0 };
    const end = { x: 0, y: 100 };

    const point = getControlPoint(start, end, 0.5);
    expect(point).toEqual({ x: 0, y: 50 });

    const point2 = getControlPoint(start, end, 0.2, -2);
    expect(point2).toEqual({ x: 2, y: 20 });
  });

  it('getControlPoint 45', () => {
    const start = { x: 0, y: 0 };
    const end = { x: 100, y: 100 };
    const point = getControlPoint(start, end, 0.5, 10);
    const sqrt2 = Math.sqrt(2);
    expect(point.x).toEqual(50 - (sqrt2 * 10) / 2);
    expect(point.y).toEqual(50 + (sqrt2 * 10) / 2);
  });

  it('getControlPoint 135', () => {
    const start = { x: 100, y: 100 };
    const end = { x: 0, y: 0 };
    const point = getControlPoint(start, end, 0.5, 10);
    const sqrt2 = Math.sqrt(2);
    expect(point.x).toEqual(50 + (sqrt2 * 10) / 2);
    expect(point.y).toEqual(50 - (sqrt2 * 10) / 2);
  });

  it('getControlPoint percent is 0', () => {
    const start = { x: 100, y: 100 };
    const end = { x: 50, y: 20 };
    const point = getControlPoint(start, end);
    expect(point.x).toEqual(100);
    expect(point.y).toEqual(100);
  });

  it('pointsToPolygon points.length = 0', () => {
    const polygonPoint = pointsToPolygon([]);
    expect(polygonPoint).toEqual('');
  });

  it('pointsToPolygon z = false', () => {
    const points = [
      {
        x: 1,
        y: 2,
      },
      {
        x: 5,
        y: 5,
      },
    ];

    const polygonPoint = pointsToPolygon(points, false);
    expect(polygonPoint).toEqual('M1 2L5 5');
  });

  it('pointsToPolygon z = true', () => {
    const points = [
      {
        x: 1,
        y: 2,
      },
      {
        x: 5,
        y: 5,
      },
    ];

    const polygonPoint = pointsToPolygon(points, true);
    expect(polygonPoint).toEqual('M1 2L5 5Z');
  });

  it('pointsToPolygon substitute', () => {
    const points = [
      {
        x: 1,
        y: 2,
      },
      '',
    ];

    const polygonPoint = pointsToPolygon(points, true);
    expect(polygonPoint).toEqual('M1 2L{x} {y}Z');
  });
});
