import { vec2 } from '@antv/matrix-util';
import { catmullRom2Bezier } from '@antv/path-util';
import { IPoint } from '../types';

/**
 * 替换字符串中的字段
 * @param {String} str 模版字符串
 * @param {Object} o json data
 */
const substitute = (str: string, o: any): string => {
  if (!str || !o) {
    return str;
  }

  return str.replace(/\\?\{([^{}]+)\}/g, (match: string, name: string) => {
    if (match.charAt(0) === '\\') {
      return match.slice(1);
    }
    return o[name] || '';
  });
};

/**
 * 给定坐标获取三次贝塞尔曲线的 M 及 C 值
 * @param points coordinate set
 */
export const getSpline = (points: IPoint[]) => {
  const data: number[] = [];

  if (points.length < 2) {
    throw new Error(`point length must largn than 2, now it's ${points.length}`);
  }
  for (const point of points) {
    const { x, y } = point;
    data.push(x);
    data.push(y);
  }

  const spliePath = catmullRom2Bezier(data);
  spliePath.unshift(['M', points[0].x, points[0].y]);
  return spliePath;
};

/**
 * 根据起始点、相对位置、偏移量计算控制点
 * @param  {IPoint} startPoint 起始点，包含 x,y
 * @param  {IPoint} endPoint  结束点, 包含 x,y
 * @param  {Number} percent   相对位置,范围 0-1
 * @param  {Number} offset    偏移量
 * @return {IPoint} 控制点，包含 x,y
 */
export const getControlPoint = (
  startPoint: IPoint,
  endPoint: IPoint,
  percent: number = 0,
  offset: number = 0,
): IPoint => {
  const point: IPoint = {
    x: (1 - percent) * startPoint.x + percent * endPoint.x,
    y: (1 - percent) * startPoint.y + percent * endPoint.y,
  };

  let tangent: number[] = [];
  vec2.normalize(tangent, [endPoint.x - startPoint.x, endPoint.y - startPoint.y]);

  if (tangent.length === 0) {
    tangent = [0, 0];
  }
  const perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // 垂直向量
  point.x += perpendicular[0];
  point.y += perpendicular[1];
  return point;
};

/**
 * 点集转化为Path多边形
 * @param {Array} points 点集
 * @param {Boolen} z 是否封闭
 * @return {Array} Path
 */
export const pointsToPolygon = (points: IPoint[], z?: boolean): string => {
  const { length } = points;
  if (!length) {
    return '';
  }

  let path = '';
  let str = '';

  for (let i = 0; i < length; i++) {
    const item = points[i];
    if (i === 0) {
      str = 'M{x} {y}';
    } else {
      str = 'L{x} {y}';
    }
    path += substitute(str, item);
  }

  if (z) {
    path += 'Z';
  }
  return path;
};
