import { type PathArray } from '@antv/util';
import type { Point, Vector2 } from '../../types';
import { getLinesIntersection } from '../../utils/line';
import { getClosedSpline } from '../../utils/path';
import { sortByClockwise } from '../../utils/point';
import { add, angle, normalize, perpendicular, scale, subtract, toVector2, toVector3 } from '../../utils/vector';
import type { HullOptions } from '../hull';

/**
 * <zh/> 计算 Hull 路径
 *
 * <en/> Compute Hull Path
 * @param points - <zh/> 顶点列表 | <en/> Vertices of Hull
 * @param padding - <zh/> 内边距 | <en/> padding
 * @param corner - <zh/> 拐角类型，目前支持 'sharp'、'rounded' 和 'smooth' | <en/> Corner type, currently supports 'sharp', 'rounded' and 'smooth'
 * @returns <zh/> Hull 路径 | <en/> Hull Path
 */
export function computeHullPath(points: Point[], padding: number, corner: 'rounded' | 'smooth' | 'sharp'): PathArray {
  if (points.length === 1) return genSinglePointHullPath(points[0], padding, corner);
  if (points.length === 2) return genTwoPointsHullPath(points, padding, corner);
  switch (corner) {
    case 'smooth':
      return genMultiPointsSmoothHull(points, padding);
    case 'sharp':
      return genMultiPointsSharpHull(points, padding);
    case 'rounded':
    default:
      return genMultiPointsRoundedHull(points, padding);
  }
}

/**
 * <zh/> 生成单点 Hull 路径
 *
 * <en/> Generate Hull Path for a single point
 * @param point - <zh/> 单点 | <en/> Single point
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @param corner - <zh/> 拐角类型 | <en/> Corner type
 * @returns <zh/> 单点 Hull 路径 | <en/> Single point Hull Path
 */
const genSinglePointHullPath = (point: Point, padding: number, corner: HullOptions['corner']): PathArray => {
  if (corner === 'sharp')
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
 * <zh/> 生成两点 Hull 路径
 *
 * <en/> Generate Hull Path for two points
 * @param points - <zh/> 两点 | <en/> Two points
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @param corner - <zh/> 拐角类型 | <en/> Corner type
 * @returns <zh/> 两点 Hull 路径 | <en/> Two points Hull Path
 */
const genTwoPointsHullPath = (points: Point[], padding: number, corner: HullOptions['corner']): PathArray => {
  const arcData: [number, number, number, number, number] = [padding, padding, 0, 0, 0];

  const point1 =
    corner === 'sharp' ? add(points[0], scale(normalize(subtract(points[0], points[1])), padding)) : points[0];
  const point2 =
    corner === 'sharp' ? add(points[1], scale(normalize(subtract(points[1], points[0])), padding)) : points[1];

  const offsetVector = scale(normalize(perpendicular(subtract(point1, point2) as Vector2, false)), padding);
  const invOffsetVector = scale(offsetVector, -1);

  const prev = add(point1, offsetVector);
  const current = add(point2, offsetVector);
  const p2 = add(point2, invOffsetVector);
  const p3 = add(point1, invOffsetVector);

  if (corner === 'sharp') {
    return [['M', prev[0], prev[1]], ['L', current[0], current[1]], ['L', p2[0], p2[1]], ['L', p3[0], p3[1]], ['Z']];
  }

  return [
    ['M', prev[0], prev[1]],
    ['L', current[0], current[1]],
    ['A', ...arcData, p2[0], p2[1]],
    ['L', p3[0], p3[1]],
    ['A', ...arcData, prev[0], prev[1]],
  ];
};

/**
 * <zh/> 生成多点 Hull 路径且拐角为圆角
 *
 * <en/> Generate Hull Path for multiple points with rounded corners
 * @param points - <zh/> 形成 Hull 的点集 | <en/> Points that form the Hull
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @returns <zh/> 圆角外壳路径 | <en/> Rounded hull path
 */
const genMultiPointsRoundedHull = (points: Point[], padding: number): PathArray => {
  const segments = sortByClockwise(points).map((current, i) => {
    const prev2Index = (i - 2 + points.length) % points.length;
    const prevIndex = (i - 1 + points.length) % points.length;
    const nextIndex = (i + 1) % points.length;
    const prev2 = points[prev2Index];
    const prev = points[prevIndex];
    const next = points[nextIndex];

    const v0 = subtract(prev2, prev) as Vector2;
    const v1 = subtract(prev, current) as Vector2;
    const v2 = subtract(current, next) as Vector2;

    // 判断是否为凹角 ｜ Determine if it is a concave angle
    const isConcave = (v1: Vector2, v2: Vector2): boolean => {
      return angle(v1, v2, true) < Math.PI;
    };
    const concavePrev = isConcave(v0, v1);
    const concaveNext = isConcave(v1, v2);

    const offsetVector = (v: Vector2) => scale(normalize(perpendicular(v, false)), padding);
    const offset = offsetVector(v1);
    return [
      {
        p: toVector2(concavePrev ? add(prev, offsetVector(v0)) : add(prev, offset)),
        concave: concavePrev && prev,
      },
      {
        p: toVector2(concaveNext ? add(current, offsetVector(v2)) : add(current, offset)),
        concave: concaveNext && current,
      },
    ];
  });
  const arcData = [padding, padding, 0, 0, 0];
  const startIndex = segments.findIndex(
    (segment, i) =>
      !segments[(i - 1 + segments.length) % segments.length][0].concave &&
      !segments[(i - 1 + segments.length) % segments.length][1].concave &&
      !segment[0].concave &&
      !segment[0].concave &&
      !segment[1].concave,
  );
  const sortedSegments = segments.slice(startIndex).concat(segments.slice(0, startIndex));
  let concavePoints: Point[] = [];
  return sortedSegments.flatMap((segment, i) => {
    const pathFragment = [];
    const lastSegment = sortedSegments[segments.length - 1];
    if (i === 0) pathFragment.push(['M', ...lastSegment[1].p]);
    if (!segment[0].concave) {
      pathFragment.push(['A', ...arcData, ...segment[0].p]);
    } else {
      concavePoints.push(segment[0].p, segment[1].p);
    }
    if (!segment[1].concave) {
      pathFragment.push(['L', ...segment[1].p]);
    } else {
      concavePoints.unshift(segment[1].p);
    }
    if (concavePoints.length === 3) {
      pathFragment.pop();
      pathFragment.push(['C', ...concavePoints.flat()]);
      concavePoints = [];
    }
    return pathFragment;
  }) as PathArray;
};

/**
 * <zh/> 生成多点 Hull 路径且拐角为平滑
 *
 * <en/> Generate Hull Path for multiple points with smooth corners
 * @param points - <zh/> 形成 Hull 的点集 | <en/> Points that form the Hull
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @returns <zh/> 平滑外壳路径 | <en/> Smooth hull path
 */
const genMultiPointsSmoothHull = (points: Point[], padding: number): PathArray => {
  const hullPoints = sortByClockwise(points).map((p, i) => {
    const pNext = points[(i + 1) % points.length];
    return { p, v: normalize(subtract(pNext, p)) };
  });

  // Compute the expanded hull points, and the nearest prior control point for each.
  hullPoints.forEach((hp, i) => {
    const priorIndex = i > 0 ? i - 1 : points.length - 1;
    const prevV = hullPoints[priorIndex].v as Vector2;
    const extensionVec = normalize(add(prevV, scale(hp.v, angle(prevV, hp.v, true) < Math.PI ? 1 : -1)));
    hp.p = add(hp.p, scale(extensionVec, padding));
  });

  return getClosedSpline(hullPoints.map((obj) => obj.p));
};

/**
 * <zh/> 生成多点 Hull 路径且拐角为尖锐
 *
 * <en/> Generate Hull Path for multiple points with sharp corners
 * @param points - <zh/> 形成 Hull 的点集 | <en/> Points that form the Hull
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @returns <zh/> 锐角外壳路径 | <en/> Sharp hull path
 */
const genMultiPointsSharpHull = (points: Point[], padding: number): PathArray => {
  const segments = points.map((current, i) => {
    const prev = points[i === 0 ? points.length - 1 : i - 1];
    const offset = toVector3(scale(normalize(perpendicular(subtract(prev, current) as Vector2, false)), padding));
    return [add(prev, offset), add(current, offset)];
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
