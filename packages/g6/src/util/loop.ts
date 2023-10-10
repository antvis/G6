import { Tuple3Number } from '@antv/g';
import { vec2 } from 'gl-matrix';
import { LOOP_POSITION, LoopPosition } from '../types/loop';

const PI_OVER_8 = Math.PI / 8;

const radiansMap = {
  [LOOP_POSITION.top]: [-5 * PI_OVER_8, -3 * PI_OVER_8],
  [LOOP_POSITION['top-right']]: [-3 * PI_OVER_8, -PI_OVER_8],
  [LOOP_POSITION.right]: [-PI_OVER_8, PI_OVER_8],
  [LOOP_POSITION['bottom-right']]: [PI_OVER_8, 3 * PI_OVER_8],
  [LOOP_POSITION.bottom]: [3 * PI_OVER_8, 5 * PI_OVER_8],
  [LOOP_POSITION['bottom-left']]: [5 * PI_OVER_8, 7 * PI_OVER_8],
  [LOOP_POSITION.left]: [7 * PI_OVER_8, 9 * PI_OVER_8],
  [LOOP_POSITION['top-left']]: [-7 * PI_OVER_8, -5 * PI_OVER_8],
};

/**
 * Calculates the start and end points of an ellipse based on the given position.
 * @param {LoopPosition} position - The position of the ellipse (top, top-right, right, bottom-right, bottom, bottom-left, left, top-left).
 * @param {Tuple3Number} center - The center coordinates.
 * @param {number} halfOfWidth - Half of the width.
 * @param {number} halfOfHeight - Half of the height.
 * @returns {[vec2, vec2]} - An array containing the start and end points of the ellipse.
 */
export const calculatePointForEllipse = (
  position: LoopPosition,
  center: Tuple3Number,
  halfOfWidth: number,
  halfOfHeight: number,
): [vec2, vec2] => {
  const [rstartX, rstartY, rendX, rendY] = getPointsOnEllipseAtAngles(
    halfOfWidth,
    halfOfHeight,
    radiansMap[position]?.[0] || -PI_OVER_8,
    radiansMap[position]?.[1] || PI_OVER_8,
  );
  return [
    [center[0] + rstartX, center[1] + rstartY],
    [center[0] + rendX, center[1] + rendY],
  ];
};

/**
 * Calculates the start and end points of a shape other than an ellipse based on the given position.
 * @param {LoopPosition} position
 * @param {Tuple3Number} center - The center coordinates.
 * @param {number} halfOfWidth - Half of the width of keyShape.
 * @param {number} halfOfHeight - Half of the height of keyShape.
 * @param {number} customPointPadding - Optional custom padding for the point calculation.
 */
export const calculatePointForOtherShapes = (
  position: LoopPosition,
  center: Tuple3Number,
  halfOfWidth: number,
  halfOfHeight: number,
  customPointPadding?: number,
): [vec2, vec2] => {
  // For aesthetic considerations, pointPadding defaults to 1/4 of the minimum width and high school.
  const defaultPointPadding = Math.min(halfOfHeight / 2, halfOfWidth / 2);
  const maxPointPadding = Math.min(halfOfHeight, halfOfWidth);

  const pointPadding = customPointPadding
    ? Math.min(maxPointPadding, customPointPadding)
    : defaultPointPadding;

  const pointsPositionMap: Record<LoopPosition, [vec2, vec2]> = {
    [LOOP_POSITION.top]: [
      [center[0] - pointPadding, center[1] - halfOfHeight],
      [center[0] + pointPadding, center[1] - halfOfHeight],
    ],
    // @ts-ignore
    [LOOP_POSITION['top-right']]: [
      [center[0] + halfOfWidth - pointPadding, center[1] - halfOfHeight],
      [center[0] + halfOfWidth, center[1] - halfOfHeight + pointPadding],
    ],
    [LOOP_POSITION.right]: [
      [center[0] + halfOfWidth, center[1] - pointPadding],
      [center[0] + halfOfWidth, center[1] + pointPadding],
    ],
    // @ts-ignore
    [LOOP_POSITION['bottom-right']]: [
      [center[0] + halfOfWidth, center[1] + halfOfHeight - pointPadding],
      [center[0] + halfOfWidth - pointPadding, center[1] + halfOfHeight],
    ],
    [LOOP_POSITION.bottom]: [
      [center[0] + pointPadding, center[1] + halfOfHeight],
      [center[0] - pointPadding, center[1] + halfOfHeight],
    ],
    // @ts-ignore
    [LOOP_POSITION['bottom-left']]: [
      [center[0] - halfOfWidth + pointPadding, center[1] + halfOfHeight],
      [center[0] - halfOfWidth, center[1] + halfOfHeight - pointPadding],
    ],
    [LOOP_POSITION.left]: [
      [center[0] - halfOfWidth, center[1] + pointPadding],
      [center[0] - halfOfWidth, center[1] - pointPadding],
    ],
    // @ts-ignore
    [LOOP_POSITION['top-left']]: [
      [center[0] - halfOfWidth, center[1] - halfOfHeight + pointPadding],
      [center[0] - halfOfWidth + pointPadding, center[1] - halfOfHeight],
    ],
  };
  return pointsPositionMap[position] || pointsPositionMap[LOOP_POSITION.top];
};

/**
 * Calculate the point on the ellipse at the given angle.
 * @param {number} halfOfWidth - Half of the width of the ellipse.
 * @param {number} halfOfHeight - Half of the height of the ellipse.
 * @param {number} angleInRadians - The angle in radians.
 * @returns {vec2} - The point on the ellipse at the given angle.
 */
export const getPointOnEllipseAtAngle = (
  halfOfWidth: number,
  halfOfHeight: number,
  angleInRadians: number,
): vec2 => {
  const x = halfOfWidth * Math.cos(angleInRadians);
  const y = halfOfHeight * Math.sin(angleInRadians);
  return [x, y];
};

/**
 * Calculates an array of points on an ellipse at the given angles.
 * @param {number} halfOfWidth - Half of the width of the ellipse.
 * @param {number} halfOfHeight - Half of the height of the ellipse.
 * @param {number} startAngle - The starting angle in radians.
 * @param {number} endAngle - The ending angle in radians.
 */
export const getPointsOnEllipseAtAngles = (
  halfOfWidth: number,
  halfOfHeight: number,
  startAngle: number,
  endAngle: number,
) => {
  const [rstartX, rstartY] = getPointOnEllipseAtAngle(
    halfOfWidth,
    halfOfHeight,
    startAngle,
  );
  const [rendX, rendY] = getPointOnEllipseAtAngle(
    halfOfWidth,
    halfOfHeight,
    endAngle,
  );
  return [rstartX, rstartY, rendX, rendY];
};
