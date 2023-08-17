import { vec2 } from '@antv/matrix-util';
import { Point } from '../types/common';

/**
 * Calculate the position of control point according to the start, end, and offset.
 * @param  {IPoint} startPoint Start point with x and y.
 * @param  {IPoint} endPoint  End point with x and y.
 * @param  {Number} percent   Control point's position percentage between source and end point, ranges from 0 to 1.
 * @param  {Number} offset    Offsest from the control point to the line start at startPoint and end at endPoint.
 * @return {IPoint} The control point with x and y.
 */
export const getControlPoint = (
  startPoint: Point,
  endPoint: Point,
  percent: number = 0,
  offset: number = 0,
): Point => {
  const point: Point = {
    x: (1 - percent) * startPoint.x + percent * endPoint.x,
    y: (1 - percent) * startPoint.y + percent * endPoint.y,
  };

  let tangent: vec2 = [0, 0];
  vec2.normalize(tangent, [
    endPoint.x - startPoint.x,
    endPoint.y - startPoint.y,
  ]);

  if (!tangent || (!tangent[0] && !tangent[1])) {
    tangent = [0, 0];
  }
  const perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // 垂直向量
  point.x += perpendicular[0];
  point.y += perpendicular[1];
  return point;
};
