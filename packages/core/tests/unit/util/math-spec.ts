import {
  applyMatrix,
  distance,
  floydWarshall,
  getAdjMatrix,
  getCircleCenterByPoints,
  getCircleIntersectByPoint,
  getEllipseIntersectByPoint,
  getRectIntersectByPoint,
  invertMatrix,
  scaleMatrix,
  scale,
  rotate,
  getLineIntersect,
  translate,
  move,
  isPointInPolygon,
  intersectBBox,
  isPolygonsIntersect,
  getBBoxBoundLine,
  itemIntersectByLine,
  fractionToLine,
  getPointsCenter,
  squareDist,
  pointLineSquareDist,
  isPointsOverlap,
  pointRectSquareDist,
} from '../../../src/util/math';
import Graph from '../implement-graph';
import { Canvas } from '@antv/g-canvas';

const equal = (a: number, b: number): boolean => Math.abs(a - b) < 0.0001;

const div = document.createElement('div');
div.id = 'base-spec';
document.body.appendChild(div);
const graph = new Graph({
  container: div,
  width: 800,
  height: 600,
});
graph.addItem('node', { x: 0, y: 0 });
graph.addItem('node', { x: 100, y: 100 });

describe('math util test', () => {
  it('intersect with ellipse, rx = ry', () => {
    const ellipse = {
      x: 0,
      y: 0,
      rx: 1,
      ry: 1,
    };
    const p1 = getEllipseIntersectByPoint(ellipse, { x: 2, y: 0 });
    expect(equal(p1.x, 1)).toEqual(true);
    expect(equal(p1.y, 0)).toEqual(true);
    const p2 = getEllipseIntersectByPoint(ellipse, { x: -2, y: 0 });
    expect(equal(p2.x, -1)).toEqual(true);
    expect(equal(p2.y, 0)).toEqual(true);
    const p3 = getEllipseIntersectByPoint(ellipse, { x: 0, y: 2 });
    expect(equal(p3.x, 0)).toEqual(true);
    expect(equal(p3.y, 1)).toEqual(true);
    const p4 = getEllipseIntersectByPoint(ellipse, { x: 0, y: -2 });
    expect(equal(p4.x, 0)).toEqual(true);
    expect(equal(p4.y, -1)).toEqual(true);

    const p5 = getEllipseIntersectByPoint(ellipse, { x: 2, y: 2 });
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
    arr.forEach((point) => {
      const p = getEllipseIntersectByPoint(ellipse, point);
      // x*x/a*a + y*y/b*b = 1
      const v = (p.x * p.x) / 25 + (p.y * p.y) / 16;
      expect(equal(v, 1)).toEqual(true);
    });

    ellipse = { x: 0, y: 0, rx: 4, ry: 5 };
    // rx < ry
    arr.forEach((point) => {
      const p = getEllipseIntersectByPoint(ellipse, point);
      // x*x/a*a + y*y/b*b = 1
      const v = (p.x * p.x) / 16 + (p.y * p.y) / 25;
      expect(equal(v, 1)).toEqual(true);
    });
    ellipse = { x: 2, y: 2, rx: 4, ry: 5 };
    arr.forEach((point) => {
      const p = getEllipseIntersectByPoint(ellipse, point);
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

  it('applyMatrix with null matrix', () => {
    const point = {
      x: 10,
      y: 15,
    };

    const p = applyMatrix(point, null, 0);
    expect(p).toEqual({ x: 10, y: 15 });
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

  it('invertMatrix with null matrix', () => {
    const point = {
      x: 30,
      y: 10,
    };

    const p = invertMatrix(point, null, 0);
    expect(p).toEqual({ x: 30, y: 10 });
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
  it('scale and rotate', () => {
    const div = document.createElement('div');
    div.id = 'edge-shape';
    document.body.appendChild(div);
    const canvas = new Canvas({
      container: 'edge-shape',
      width: 600,
      height: 600,
    });
    const group = canvas.addGroup();
    scale(group, 0.5);
    const matrix = group.getMatrix();
    expect(matrix[0]).toBe(0.5);
    scale(group, [0.5]);
    const matrix2 = group.getMatrix();
    expect(matrix2[0]).toBe(0.25);
    rotate(group, 1.3);
    const matrix3 = group.getMatrix();
    expect(matrix3[0]).toBe(0.06687470715614684);
    expect(matrix3[1]).toBe(0.24088954635429824);
    expect(matrix3[3]).toBe(-0.24088954635429824);

    // rotate a group with null matrix
    const group2 = canvas.addGroup();
    const oriGroup2Matrix = group2.getMatrix();
    expect(oriGroup2Matrix).toBe(null);
    rotate(group2, 3);
    const group2Matrix = group2.getMatrix();
    expect(group2Matrix[0]).toBe(-0.9899924966004454);
    expect(group2Matrix[1]).toBe(0.1411200080598672);
    expect(group2Matrix[3]).toBe(-0.1411200080598672);
    expect(group2Matrix[4]).toBe(-0.9899924966004454);
  });

  it('getLineIntersect', () => {
    const intersect = getLineIntersect(
      { x: 0, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 100, y: 0 },
    );
    expect(intersect.x).toBe(50);
    expect(intersect.y).toBe(50);
  });

  it('translate', () => {
    const group = graph.getGroup();
    expect(group.getMatrix()).toEqual(null);
    translate(group, { x: 10, y: 10 });
    const matrix = group.getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(10);
    expect(matrix[7]).toEqual(10);
  });

  it('move', () => {
    const group = graph.getGroup();
    move(group, { x: 100, y: 100 });
    const matrix = group.getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(110.5);
    expect(matrix[7]).toEqual(110.5);
  });

  it('isPointInPolygon', () => {
    expect(
      isPointInPolygon(
        [
          [0, 0],
          [100, 0],
        ],
        50,
        50,
      ),
    ).toEqual(false);
    expect(
      isPointInPolygon(
        [
          [0, 0],
          [100, 0],
          [100, 100],
          [0, 100],
        ],
        50,
        50,
      ),
    ).toEqual(true);
    expect(
      isPointInPolygon(
        [
          [0, 0],
          [100, 0],
          [100, 100],
          [0, 100],
        ],
        150,
        50,
      ),
    ).toEqual(false);
  });

  it('intersectBBox', () => {
    const nodes = graph.getNodes();
    expect(intersectBBox(nodes[0].getBBox(), nodes[1].getBBox())).toBe(false);
    expect(intersectBBox(nodes[0].getBBox(), nodes[0].getBBox())).toBe(true);
  });

  it('isPolygonsIntersect', () => {
    expect(
      isPolygonsIntersect(
        [
          [0, 0],
          [100, 0],
          [100, 100],
          [0, 100],
        ],
        [
          [10, 10],
          [110, 10],
          [110, 110],
          [10, 110],
        ],
      ),
    ).toEqual(true);
    expect(
      isPolygonsIntersect(
        [
          [0, 0],
          [100, 0],
          [100, 100],
          [0, 100],
        ],
        [
          [110, 110],
          [210, 110],
          [210, 210],
          [110, 210],
        ],
      ),
    ).toEqual(false);
  });

  it('getBBoxBoundLine', () => {
    const topLine = getBBoxBoundLine(graph.getNodes()[0].getBBox(), 'top');
    const leftLine = getBBoxBoundLine(graph.getNodes()[0].getBBox(), 'left');
    const bottomLine = getBBoxBoundLine(graph.getNodes()[0].getBBox(), 'bottom');
    const rightLine = getBBoxBoundLine(graph.getNodes()[0].getBBox(), 'right');
    expect(topLine[0]).toEqual(-10.5);
    expect(topLine[2]).toEqual(10.5);
    expect(leftLine[0]).toEqual(-10.5);
    expect(leftLine[2]).toEqual(-10.5);
    expect(bottomLine[0]).toEqual(-10.5);
    expect(bottomLine[2]).toEqual(10.5);
    expect(rightLine[0]).toEqual(10.5);
    expect(rightLine[2]).toEqual(10.5);
  });

  it('itemIntersectByLine', () => {
    const node = graph.getNodes()[0];
    const line: any = { x1: 0, y1: 0, x2: 100, y2: 100 };
    const result = itemIntersectByLine(node, line);
    expect(result[0][0]).toEqual(null);
    expect(result[0][1]).toEqual(null);
    expect(result[0][2].x).toEqual(10.5);
    expect(result[0][2].y).toEqual(10.5);
    expect(result[0][3].x).toEqual(10.5);
    expect(result[0][3].y).toEqual(10.5);
    expect(result[1]).toEqual(2);
  });

  it('fractionToLine', () => {
    const node = graph.getNodes()[0];
    const line: any = { x1: 220, y1: 100, x2: 100, y2: 100 };
    const res = fractionToLine(node, line);
    expect(res).toBe(-1);
    const line2: any = { x1: 0, y1: 0, x2: 100, y2: 100 };
    const res2 = fractionToLine(node, line2);
    expect(res2).toBe(0.395);
  });

  it('getPointsCenter', () => {
    [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100],
    ];
    expect(
      getPointsCenter([
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ]),
    ).toEqual({ x: 50, y: 50 });
  });

  it('squareDist', () => {
    expect(squareDist({ x: 0, y: 0 }, { x: 100, y: 100 })).toBe(20000);
  });

  it('pointLineSquareDist', () => {
    const dist = pointLineSquareDist({ x: 0, y: 0 }, { x1: 100, y1: 0, x2: 100, y2: 100 } as any);
    expect(dist).toBe(10000);
  });

  it('isPointsOverlap', () => {
    expect(isPointsOverlap({ x: 0, y: 0 }, { x: 0.0001, y: 0 })).toBe(true);
    expect(isPointsOverlap({ x: 0, y: 0 }, { x: 10, y: 0 })).toBe(false);
  });
  it('pointRectSquareDist', () => {
    const rect = { x: 0, y: 0, width: 10, height: 10 };
    expect(pointRectSquareDist({ x: 0, y: 0 }, rect)).toBe(0);
    expect(pointRectSquareDist({ x: 5, y: 15 }, rect)).toBe(25);
    expect(pointRectSquareDist({ x: 20, y: 20 }, rect)).toBe(200);
  });
});
