import type { PathArray } from '@antv/util';
import type { Point } from '../types';

const PATH_COMMANDS: Record<string, string[]> = {
  M: ['x', 'y'],
  m: ['dx', 'dy'],
  H: ['x'],
  h: ['dx'],
  V: ['y'],
  v: ['dy'],
  L: ['x', 'y'],
  l: ['dx', 'dy'],
  Z: [],
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
  let currentCommand = '';
  let currentElement = {};
  while (items.length > 0) {
    let it = items.shift()!;
    if (it in PATH_COMMANDS) {
      currentCommand = it;
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
    segments.push(currentElement);
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
