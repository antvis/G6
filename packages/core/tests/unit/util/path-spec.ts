import {
  getControlPoint,
  getSpline,
  pointsToPolygon,
  pathToPoints,
  getClosedSpline,
  roundedHull,
  paddedHull,
} from '../../../src/util/path';
import { vec2 } from '@antv/matrix-util';

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
    expect(second[1]).toEqual(10);
    expect(second[2]).toEqual(12);
    expect(second[5]).toEqual(5);

    const three = splinePath[2];
    expect(three.length).toEqual(7);
    expect(three[2]).toEqual(5);
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

  it('pathToPoints', () => {
    const path = [
      ['M', 0, 0],
      ['L', 10, 10],
      ['L', 100, 40],
    ];
    const points = pathToPoints(path);
    expect(points[0][0]).toBe(0);
    expect(points[1][0]).toBe(10);
    expect(points[2][0]).toBe(100);
  });

  it('getClosedSpline', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      { x: 100, y: 40 },
    ];
    const res = getClosedSpline(points);
    expect(res[0][0]).toBe('M');
    expect(res[0][1]).toBe(100);
    expect(res[0][2]).toBe(40);
    expect(res[1][0]).toBe('C');
    expect(res[1][3]).toBe(15);
    expect(res[1][4]).toBe(5);
    expect(res[2][0]).toBe('C');
    expect(res[2][1]).toBe(-15);
    expect(res[2][2]).toBe(-5);
    expect(res[4][0]).toBe('C');
    expect(res[4][3]).toBe(15);
    expect(res[4][4]).toBe(5);
  });

  it('roundedHull', () => {
    const points: vec2[] = [
      [0, 0],
      [10, 10],
      [100, 40],
    ];
    const res = roundedHull(points, 10);
    const splits = res.split(' ');
    expect(splits[0]).toEqual('M');
    expect(splits[1]).toEqual('96.83772233983161,49.48683298050514');
    expect(splits[2]).toEqual('A');
    expect(splits[3]).toEqual('10,10,0,0,0,103.71390676354103,30.715233091147407');
  });

  it('paddedHull', () => {
    const points: vec2[] = [
      [0, 0],
      [10, 10],
      [100, 40],
    ];
    const res: any = paddedHull(points, 10);
    expect(res[0].x).toEqual(-8.348410922382678);
    expect(res[0].y).toEqual(-5.504910087462066);
    expect(res[1].x).toEqual(4.742688878808661);
    expect(res[1].y).toEqual(18.506508083520398);
    expect(res[2].x).toEqual(109.38985166381534);
    expect(res[2].y).toEqual(43.439576388386264);
  });
});
