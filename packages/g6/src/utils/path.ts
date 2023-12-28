import { vec2 } from 'gl-matrix';
import { Point } from '../types/common';

/**
 * Calculate the position of control point according to the start, end, and offset.
 * @param startPoint Start point with x and y.
 * @param endPoint End point with x and y.
 * @param percent Control point's position percentage between source and end point, ranges from 0 to 1.
 * @param offset Offset from the control point to the line start at startPoint and end at endPoint.
 * @returns  The control point with x and y.
 */
export const getControlPoint = (startPoint: Point, endPoint: Point, percent = 0, offset = 0): Point => {
  const point: Point = {
    x: (1 - percent) * startPoint.x + percent * endPoint.x,
    y: (1 - percent) * startPoint.y + percent * endPoint.y,
  };

  let tangent: vec2 = [0, 0];
  vec2.normalize(tangent, [endPoint.x - startPoint.x, endPoint.y - startPoint.y]);

  if (!tangent || (!tangent[0] && !tangent[1])) {
    tangent = [0, 0];
  }
  const perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // 垂直向量
  point.x += perpendicular[0];
  point.y += perpendicular[1];
  return point;
};

const PATH_COMMANDS = {
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
 * Converts a path string to an array of path segments.
 * @param {string} path - The path string to convert.
 * @returns {Array} - An array of path segments.
 */
const fromPathToArray = (path: string) => {
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
    let it = items.shift();
    if (it in PATH_COMMANDS) {
      currentCommand = it;
    } else {
      items.unshift(it);
    }
    currentElement = { type: currentCommand };
    PATH_COMMANDS[currentCommand].forEach((prop) => {
      it = items.shift(); // TODO sanity check
      currentElement[prop] = it;
    });
    if (currentCommand === 'M') {
      currentCommand = 'L';
    } else if (currentCommand === 'm') {
      currentCommand = 'l';
    }
    segments.push(currentElement);
  }
  return segments;
};

/**
 * Converts a path to an array of points.
 * @param {Array|string} path - The path to convert to points.
 * @returns {Array} - An array of points.
 */
export const pathToPoints = (path: any[] | string) => {
  const points = [];
  let segments = [];
  if (typeof path === 'string') {
    segments = fromPathToArray(path);
  } else {
    segments = path;
  }
  segments.forEach((seg) => {
    const command = seg[0];
    if (command !== 'A') {
      for (let i = 1; i < seg.length; i = i + 2) {
        points.push([seg[i], seg[i + 1]]);
      }
    } else {
      const length = seg.length;
      points.push([seg[length - 2], seg[length - 1]]);
    }
  });
  return points;
};
