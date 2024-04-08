/**
 * Convex Hull (the smallest convex polygon that contains all the points)
 */
import type { PathArray } from '@antv/util';
import type { Point, Vector2 } from '../../types';
import { getLinesIntersection } from '../../utils/line';
import { add, cross, normalize, perpendicular, scale, subtract, toVector3 } from '../../utils/vector';
import { getClosedSpline } from './util';

export interface ConvexHullOptions {
  /**
   * <zh/> Convex Hull 的拐角类型，目前支持 'rounded'、'smooth' 和 'sharp'。此属性仅在 hullType 为 'convex-hull' 时生效。
   * <en/> Convex Hul corner type, currently supports 'rounded', 'smooth' and 'sharp'. This property only takes effect when hullType is 'convex-hull'.
   */
  cornerType?: 'rounded' | 'smooth' | 'sharp';
}

/**
 * <zh/> Monotone Chain 算法根据点集查找凸包路径点
 *
 * <en/> Monotone Chain algorithm for finding the convex hull of a set of points.
 * @param points - <zh/> 按 x 坐标从小到大排序后的点集 | <en/> x-coordinate sorted points
 * @returns <zh/> 按顺时针顺序的凸包顶点列表 | <en/> a list of vertices of the convex hull in counter-clockwise order
 */
export function convexHull(points: Point[]): Point[] {
  const n = points.length;
  let k = 0;

  if (n <= 2) return points;

  const ans: Point[] = [];

  // 构建下凸包 | Build lower hull
  for (let i = 0; i < n; ++i) {
    // If the point at K-1 position is not a part of hull as vector from ans[k-2] to ans[k-1] and ans[k-2] to points[i] has a clockwise turn
    while (k >= 2 && cross(subtract(ans[k - 1], ans[k - 2]), subtract(points[i], ans[k - 2]))[2] >= 0) k--;
    ans[k++] = points[i];
  }

  // 构建上凸包 | Build upper hull
  for (let i = n - 1, t = k + 1; i > 0; --i) {
    // If the point at K-1 position is not a part of hull as vector from ans[k-2] to ans[k-1] and ans[k-2] to points[i] has a clockwise turn
    while (k >= t && cross(subtract(ans[k - 1], ans[k - 2]), subtract(points[i - 1], ans[k - 2]))[2] >= 0) k--;
    ans[k++] = points[i - 1];
  }

  ans.length = k - 1;

  return ans;
}

/**
 * <zh/> 生成 Convex Hull 路径
 *
 * <en/> Generate Convex Hull Path
 * @param points - <zh/> Hull 的顶点列表 | <en/> Vertices list of Hull
 * @param padding - <zh/> Hull 的内边距 | <en/> Hull padding
 * @param cornerType - <zh/> 拐角类型，目前支持 'sharp'、'rounded' 和 'smooth' | <en/> Corner type, currently supports 'sharp', 'rounded' and 'smooth'
 * @returns <zh/> 圆角外壳路径 | <en/> Rounded hull path
 */
export function genConvexHullPath(
  points: Point[],
  padding: number,
  cornerType: 'rounded' | 'smooth' | 'sharp',
): PathArray {
  if (points.length === 1) return genSinglePointHullPath(points[0], padding, cornerType);
  if (points.length === 2) return genTwoPointsHullPath(points, padding, cornerType);
  switch (cornerType) {
    case 'rounded':
      return genMultiPointsRoundHull(points, padding);
    case 'smooth':
      return genMultiPointsSmoothHull(points, padding);
    case 'sharp':
      return genMultiPointsSharpHull(points, padding);
    default:
      return genMultiPointsRoundHull(points, padding);
  }
}

/**
 * <zh/> 生成单点 Convex Hull 路径
 *
 * <en/> Generate Convex Hull Path for a single point
 * @param point - <zh/> 单点 | <en/> Single point
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @param cornerType - <zh/> 拐角类型 | <en/> Corner type
 * @returns <zh/> 单点 Convex Hull 路径 | <en/> Single point Convex Hull Path
 */
const genSinglePointHullPath = (
  point: Point,
  padding: number,
  cornerType: ConvexHullOptions['cornerType'],
): PathArray => {
  if (cornerType === 'sharp')
    return [
      ['M', point[0] - padding, point[1] - padding],
      ['L', point[0] + padding, point[1] - padding],
      ['L', point[0] + padding, point[1] + padding],
      ['L', point[0] - padding, point[1] + padding],
      ['Z'],
    ];
  const arcData: [number, number, number, number, number] = [padding, padding, 0, 0, 0];
  return [
    ['M', point[0], point[1] - padding],
    ['A', ...arcData, point[0], point[1] + padding],
    ['A', ...arcData, point[0], point[1] - padding],
  ];
};

/**
 * <zh/> 生成两点 Convex Hull 路径
 *
 * <en/> Generate Convex Hull Path for two points
 * @param points - <zh/> 两点 | <en/> Two points
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @param cornerType - <zh/> 拐角类型 | <en/> Corner type
 * @returns <zh/> 两点 Convex Hull 路径 | <en/> Two points Convex Hull Path
 */
const genTwoPointsHullPath = (
  points: Point[],
  padding: number,
  cornerType: ConvexHullOptions['cornerType'],
): PathArray => {
  const arcData: [number, number, number, number, number] = [padding, padding, 0, 0, 0];

  const point1 =
    cornerType === 'sharp' ? add(points[0], scale(normalize(subtract(points[0], points[1])), padding)) : points[0];
  const point2 =
    cornerType === 'sharp' ? add(points[1], scale(normalize(subtract(points[1], points[0])), padding)) : points[1];

  const offsetVector = scale(normalize(perpendicular(subtract(point1, point2) as Vector2, false)), padding);
  const invOffsetVector = scale(offsetVector, -1);

  const p0 = add(point1, offsetVector);
  const p1 = add(point2, offsetVector);
  const p2 = add(point2, invOffsetVector);
  const p3 = add(point1, invOffsetVector);

  if (cornerType === 'sharp') {
    return [['M', p0[0], p0[1]], ['L', p1[0], p1[1]], ['L', p2[0], p2[1]], ['L', p3[0], p3[1]], ['Z']];
  }

  return [
    ['M', p0[0], p0[1]],
    ['L', p1[0], p1[1]],
    ['A', ...arcData, p2[0], p2[1]],
    ['L', p3[0], p3[1]],
    ['A', ...arcData, p0[0], p0[1]],
  ];
};

/**
 * <zh/> 生成多点 Convex Hull 路径且拐角为圆角
 *
 * <en/> Generate Convex Hull Path for multiple points with rounded corners
 * @param points - <zh/> 形成 Hull 的点集 | <en/> Points that form the Hull
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @returns <zh/> 圆角外壳路径 | <en/> Rounded hull path
 */
const genMultiPointsRoundHull = (points: Point[], padding: number): PathArray => {
  const arcData = [padding, padding, 0, 0, 0];
  const segments = points.map((p1, i) => {
    const p0 = points[i === 0 ? points.length - 1 : i - 1];
    const offset = scale(normalize(perpendicular(subtract(p0, p1) as Vector2, false)), padding);
    return [add(p0, offset), add(p1, offset)];
  });

  return segments.flatMap((segment, i) => {
    const pathFragment = [];
    if (i === 0) pathFragment.push(['M', ...segments[segments.length - 1][1].slice(0, 2)]);
    pathFragment.push(['A', ...arcData, ...segment[0].slice(0, 2)], ['L', ...segment[1].slice(0, 2)]);
    return pathFragment;
  }) as PathArray;
};

/**
 * <zh/> 生成多点 Convex Hull 路径且拐角为平滑
 *
 * <en/> Generate Convex Hull Path for multiple points with smooth corners
 * @param points - <zh/> 形成 Hull 的点集 | <en/> Points that form the Hull
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @returns <zh/> 平滑外壳路径 | <en/> Smooth hull path
 */
const genMultiPointsSmoothHull = (points: Point[], padding: number): PathArray => {
  const hullPoints = points.map((p, i) => {
    const pNext = points[(i + 1) % points.length];
    return { p, v: normalize(subtract(pNext, p)) };
  });

  // Compute the expanded hull points, and the nearest prior control point for each.
  hullPoints.forEach((hp, i) => {
    const priorIndex = i > 0 ? i - 1 : points.length - 1;
    const extensionVec = normalize(add(hullPoints[priorIndex].v, scale(hp.v, -1)));
    hp.p = add(hp.p, scale(extensionVec, padding));
  });

  return getClosedSpline(hullPoints.map((obj) => obj.p));
};

/**
 * <zh/> 生成多点 Convex Hull 路径且拐角为尖锐
 *
 * <en/> Generate Convex Hull Path for multiple points with sharp corners
 * @param points - <zh/> 形成 Hull 的点集 | <en/> Points that form the Hull
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @returns <zh/> 锐角外壳路径 | <en/> Sharp hull path
 */
const genMultiPointsSharpHull = (points: Point[], padding: number): PathArray => {
  const segments = points.map((p1, i) => {
    const p0 = points[i === 0 ? points.length - 1 : i - 1];
    const offset = toVector3(scale(normalize(perpendicular(subtract(p0, p1) as Vector2, false)), padding));
    return [add(p0, offset), add(p1, offset)];
  });

  const arr = segments.flat();

  const vertices = arr
    .map((_, i) => {
      if (i % 2 === 0) return null;
      const l1 = [arr[(i - 1) % arr.length], arr[i % arr.length]] as [Point, Point];
      const l2 = [arr[(i + 1) % arr.length], arr[(i + 2) % arr.length]] as [Point, Point];
      return getLinesIntersection(l1, l2, true);
    })
    .filter(Boolean) as Point[];

  return vertices.map((point, i) => [i === 0 ? 'M' : 'L', point[0], point[1]]).concat([['Z']]) as PathArray;
};
