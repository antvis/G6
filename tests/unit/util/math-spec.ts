import {
  applyMatrix,
  distance,
  floydWarshall,
  getAdjMatrix,
  getCircleCenterByPoints,
  getCircleIntersectByPoint,
  getEllispeIntersectByPoint,
  getRectIntersectByPoint,
  invertMatrix,
  scaleMatrix,
} from '../../../src/util/math';

const equal = (a: number, b: number): boolean => Math.abs(a - b) < 0.0001;

describe('math util test', () => {
  it('intersect with ellipse, rx = ry', () => {
    const ellipse = {
      x: 0,
      y: 0,
      rx: 1,
      ry: 1,
    };
    const p1 = getEllispeIntersectByPoint(ellipse, { x: 2, y: 0 });
    expect(equal(p1.x, 1)).toEqual(true);
    expect(equal(p1.y, 0)).toEqual(true);
    const p2 = getEllispeIntersectByPoint(ellipse, { x: -2, y: 0 });
    expect(equal(p2.x, -1)).toEqual(true);
    expect(equal(p2.y, 0)).toEqual(true);
    const p3 = getEllispeIntersectByPoint(ellipse, { x: 0, y: 2 });
    expect(equal(p3.x, 0)).toEqual(true);
    expect(equal(p3.y, 1)).toEqual(true);
    const p4 = getEllispeIntersectByPoint(ellipse, { x: 0, y: -2 });
    expect(equal(p4.x, 0)).toEqual(true);
    expect(equal(p4.y, -1)).toEqual(true);

    const p5 = getEllispeIntersectByPoint(ellipse, { x: 2, y: 2 });
    expect(equal(p5.x, Math.sqrt(2) / 2)).toEqual(true);
    expect(equal(p5.y, Math.sqrt(2) / 2)).toEqual(true);
  });

  it('intersect with ellipse, rx != ry', () => {
    const arr = [
      { x: 12, y: 0 },
      { x: 12, y: 12 },
      { x: 0, y: 12 },
      { x: -12, y: 12 },
      { x: -12, y: 0 },
      { x: 0, y: -12 },
      { x: -12, y: -12 },
    ];
    let ellipse = { x: 0, y: 0, rx: 5, ry: 4 };
    // rx > ry
    arr.forEach(point => {
      const p = getEllispeIntersectByPoint(ellipse, point);
      // x*x/a*a + y*y/b*b = 1
      const v = (p.x * p.x) / 25 + (p.y * p.y) / 16;
      expect(equal(v, 1)).toEqual(true);
    });

    ellipse = { x: 0, y: 0, rx: 4, ry: 5 };
    // rx < ry
    arr.forEach(point => {
      const p = getEllispeIntersectByPoint(ellipse, point);
      // x*x/a*a + y*y/b*b = 1
      const v = (p.x * p.x) / 16 + (p.y * p.y) / 25;
      expect(equal(v, 1)).toEqual(true);
    });
    ellipse = { x: 2, y: 2, rx: 4, ry: 5 };
    arr.forEach(point => {
      const p = getEllispeIntersectByPoint(ellipse, point);
      // x*x/a*a + y*y/b*b = 1
      const v = ((p.x - 2) * (p.x - 2)) / 16 + ((p.y - 2) * (p.y - 2)) / 25;
      expect(equal(v, 1)).toEqual(true);
    });
  });

  it('getCircleIntersectByPoint', () => {
    const circle = {
      x: 0,
      y: 0,
      r: 5,
    };

    const pointX = { x: 12, y: 0 };

    const px = getCircleIntersectByPoint(circle, pointX);
    expect(px).toEqual({ x: 5, y: 0 });

    const pointY = { x: 0, y: 6 };
    const py = getCircleIntersectByPoint(circle, pointY);
    expect(py).toEqual({ x: 0, y: 5 });

    const point = { x: 12, y: 8 };
    const p = getCircleIntersectByPoint(circle, point);
    expect(p).toEqual({ x: 4.160251471689219, y: 2.773500981126145 });
  });

  it('getRectIntersectByPoint', () => {
    const rect = {
      x: 0,
      y: 0,
      width: 20,
      height: 10,
    };

    const pointX = { x: 50, y: 0 };
    const px = getRectIntersectByPoint(rect, pointX);
    expect(px).toEqual({ x: 20, y: 3.75 });

    const point = { x: 25, y: 30 };
    const p = getRectIntersectByPoint(rect, point);
    expect(p).toEqual({ x: 13, y: 10 });
  });

  it('getCircleCenterByPoints', () => {
    const p1 = {
      x: 10,
      y: 5,
    };
    const p2 = {
      x: 15,
      y: 0,
    };
    const p3 = {
      x: 20,
      y: 8,
    };

    const p = getCircleCenterByPoints(p1, p2, p3);
    expect(p).toEqual({ x: 15.346153846153847, y: 5.346153846153846 });
  });

  it('distance', () => {
    const p1 = {
      x: 10,
      y: 5,
    };
    const p2 = {
      x: 15,
      y: 0,
    };

    const dis = distance(p1, p2);
    expect(dis).toEqual(7.0710678118654755);
  });

  it('applyMatrix tag = 0', () => {
    const point = {
      x: 10,
      y: 15,
    };
    const matrix = [0, 1, 0, 2, 0, 0, 2, 4, 1];

    const p = applyMatrix(point, matrix, 0);
    expect(p).toEqual({ x: 30, y: 10 });
  });

  it('applyMatrix tag = 1', () => {
    const point = {
      x: 10,
      y: 15,
    };
    const matrix = [0, 1, 0, 2, 0, 0, 2, 4, 1];

    const p = applyMatrix(point, matrix, 1);
    expect(p).toEqual({ x: 32, y: 14 });
  });

  it('invertMatrix tag = 0', () => {
    const point = {
      x: 30,
      y: 10,
    };
    const matrix = [0, 1, 0, 2, 0, 0, 2, 4, 1];

    const p = invertMatrix(point, matrix, 0);
    expect(p).toEqual({ x: 10, y: 15 });
  });

  it('invertMatrix tag = 1', () => {
    const point = {
      x: 32,
      y: 14,
    };
    const matrix = [0, 1, 0, 2, 0, 0, 2, 4, 1];

    const p = invertMatrix(point, matrix, 1);
    expect(p).toEqual({ x: 10, y: 15 });
  });

  it('scaleMatrix', () => {
    const matrix = [
      [1, 2, 3],
      [2, 3, 4],
      [1, 0, 1],
    ];
    const scales = scaleMatrix(matrix, 0.5);
    expect(scales[0][1]).toEqual(1);
    expect(scales[1][2]).toEqual(2);
    expect(scales[2][2]).toEqual(0.5);
  });

  it('getAdjMatrix', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
        },
        {
          id: 'node2',
          label: 'node2',
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node1',
          target: 'node1',
        },
      ],
    };

    const nonDirectedMatrix = getAdjMatrix(data, false);
    expect(nonDirectedMatrix[0]).toEqual([1, 1]);
    expect(nonDirectedMatrix[1]).toEqual([1]);

    const directedMatrix = getAdjMatrix(data, true);
    expect(directedMatrix[0]).toEqual([1, 1]);
    expect(directedMatrix[1]).toEqual([]);
  });

  it('getAdjMatrix without nodes', () => {
    const data = {
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node1',
          target: 'node1',
        },
      ],
    };

    expect(() => {
      getAdjMatrix(data, false);
    }).toThrowError('invalid nodes data!');
  });

  it('getAdjMatrix without edges', () => {
    const data1 = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
        },
        {
          id: 'node2',
          label: 'node2',
        },
      ],
    };

    const directedMatrix = getAdjMatrix(data1, true);
    expect(directedMatrix[0]).toEqual([]);
    expect(directedMatrix[1]).toEqual([]);
  });

  it('floydWarshall', () => {
    const matrix = [
      [1, 1, 2],
      [1, 0, 1],
      [1, 2, 1],
    ];

    const result = floydWarshall(matrix);
    expect(result[0]).toEqual([0, 1, 2]);
    expect(result[1]).toEqual([1, 0, 1]);
    expect(result[2]).toEqual([1, 2, 0]);
  });
});
