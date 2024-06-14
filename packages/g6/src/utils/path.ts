import type { PathArray, PathCommand } from '@antv/util';
import type { Point } from '../types';

/**
 * <zh/> points 转化为 path 路径
 *
 * <en/> points transform path.
 * @param points Point[]
 * @param isClose boolean
 * @returns path string[][]
 */
export function pointsToPath(points: Point[], isClose = true): PathArray {
  const path = [];

  points.forEach((point, index) => {
    path.push([index === 0 ? 'M' : 'L', ...point]);
  });

  if (isClose) {
    path.push(['Z']);
  }
  return path as PathArray;
}

const PATH_COMMANDS: Record<PathCommand, string[]> = {
  M: ['x', 'y'],
  m: ['dx', 'dy'],
  H: ['x'],
  h: ['dx'],
  V: ['y'],
  v: ['dy'],
  L: ['x', 'y'],
  l: ['dx', 'dy'],
  Z: [],
  z: [],
  C: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],
  c: ['dx1', 'dy1', 'dx2', 'dy2', 'dx', 'dy'],
  S: ['x2', 'y2', 'x', 'y'],
  s: ['dx2', 'dy2', 'dx', 'dy'],
  Q: ['x1', 'y1', 'x', 'y'],
  q: ['dx1', 'dy1', 'dx', 'dy'],
  T: ['x', 'y'],
  t: ['dx', 'dy'],
  A: ['rx', 'ry', 'rotation', 'large-arc', 'sweep', 'x', 'y'],
  a: ['rx', 'ry', 'rotation', 'large-arc', 'sweep', 'dx', 'dy'],
};

/**
 * <zh/> 将路径字符串转换为路径段数组
 *
 * <en/> Convert a path string to an array of path segments.
 * @param path - <zh/> 路径字符串 | <en/> path string
 * @returns <zh/> 路径段数组 | <en/> path segment array
 */
export function parsePath(path: string): PathArray {
  const items = path
    .replace(/[\n\r]/g, '')
    .replace(/-/g, ' -')
    .replace(/(\d*\.)(\d+)(?=\.)/g, '$1$2 ')
    .trim()
    .split(/\s*,|\s+/);
  const segments = [];
  let currentCommand = '' as PathCommand;
  let currentElement: Record<string, any> = {};
  while (items.length > 0) {
    let it = items.shift()!;
    if (it in PATH_COMMANDS) {
      currentCommand = it as PathCommand;
    } else {
      items.unshift(it);
    }
    currentElement = { type: currentCommand };
    PATH_COMMANDS[currentCommand].forEach((prop) => {
      it = items.shift()!; // TODO sanity check
      currentElement[prop] = it;
    });
    if (currentCommand === 'M') {
      currentCommand = 'L';
    } else if (currentCommand === 'm') {
      currentCommand = 'l';
    }
    const [type, ...values] = Object.values(currentElement);
    segments.push([type, ...values.map(Number)]);
  }
  return segments as unknown as PathArray;
}

/**
 * <zh/> 将路径转换为点数组
 *
 * <en/> Convert path to points array
 * @param path - <zh/> 路径数组 <en/> path array
 * @returns
 */
export function pathToPoints(path: string | PathArray): Point[] {
  const points: Point[] = [];
  const segments = typeof path === 'string' ? parsePath(path) : path;

  segments.forEach((seg) => {
    const command = seg[0];
    if (command === 'Z') {
      points.push(points[0]);
      return;
    }
    if (command !== 'A') {
      for (let i = 1; i < seg.length; i = i + 2) {
        points.push([seg[i] as number, seg[i + 1] as number, 0]);
      }
    } else {
      const length = seg.length;
      points.push([seg[length - 2] as number, seg[length - 1] as number, 0]);
    }
  });
  return points;
}

/**
 * <zh/> 生成平滑闭合曲线
 *
 * <en/> Generate smooth closed curves
 * @param points - <zh/> 点集 | <en/> points
 * @returns <zh/> 平滑闭合曲线 | <en/> smooth closed curves
 */
export const getClosedSpline = (points: Point[]): PathArray => {
  if (points.length < 2)
    return [
      ['M', 0, 0],
      ['L', 0, 0],
    ];
  const first = points[0];
  const second = points[1];
  const last = points[points.length - 1];
  const lastSecond = points[points.length - 2];

  points.unshift(lastSecond, last);
  points.push(first, second);

  const closedPath = [['M', last[0], last[1]]];
  for (let i = 1; i < points.length - 2; i += 1) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const [x3, y3] = i !== points.length - 2 ? points[i + 2] : [x2, y2];

    const cp1x = x1 + (x2 - x0) / 6;
    const cp1y = y1 + (y2 - y0) / 6;
    const cp2x = x2 - (x3 - x1) / 6;
    const cp2y = y2 - (y3 - y1) / 6;
    closedPath.push(['C', cp1x, cp1y, cp2x, cp2y, x2, y2]);
  }

  return closedPath as PathArray;
};
