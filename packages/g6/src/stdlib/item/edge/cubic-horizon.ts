<<<<<<< HEAD
<<<<<<< HEAD
import { off } from 'process';
=======
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
import { off } from 'process';
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
import { DisplayObject, Line } from '@antv/g';
import { EdgeDisplayModel } from 'types';
import { Point } from 'types/common';
import { EdgeModelData, EdgeShapeMap } from 'types/edge';
import { State } from 'types/item';
<<<<<<< HEAD
<<<<<<< HEAD
import { IPoint } from '@antv/g6';
import { vec2 } from '@antv/matrix-util';
import { BaseEdge } from './base';
import { CubicEdge } from './cubic';

export class CubicHorizonEdge extends CubicEdge {
=======
import { BaseEdge } from './base'
=======
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
import { IPoint } from '@antv/g6';
import { vec2 } from '@antv/matrix-util';
import { BaseEdge } from './base';
import { CubicEdge } from './cubic';

export class CubicHorizonEdge extends CubicEdge {
<<<<<<< HEAD

>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
  public type = 'cubic-horizon-edge';

  public defaultStyles = {
    keyShape: {
      x1: 0,
      y1: 0,
      z1: 0,
      x2: 0,
      y2: 0,
      z2: 0,
      isBillboard: true,
    },
  };
  constructor(props) {
    super(props);
    // suggest to merge default styles like this to avoid style value missing
    // this.defaultStyles = mergeStyles([this.baseDefaultStyles, this.defaultStyles]);
  }

  /**
   * calculate the control points by curvePosition|controlPoints|curveOffset
   * @param startPoint: source point position of edge
   * @param endPoint target point position of edge
   * @param percent the proportion of control points' in the segment, Range 0 to 1
<<<<<<< HEAD
<<<<<<< HEAD
   * @param controlPoints the control point position
   * @param offset the curveOffset
   * @returns control points
   */
  protected getControlPoints: (
    startPoint: Point,
    endPoint: Point,
    percent: number,
    controlPoints: number[],
    offset: number,
  ) => [Point, Point] = (
    startPoint: Point,
    endPoint: Point,
    percent = 0.5,
    controlPoints,
    offset = 20,
  ) => {
    if ((startPoint.x - endPoint.x) * (startPoint.y - endPoint.y) < 0) {
      offset = -offset;
    }

    const controlPoint1: IPoint = this.getControlPoint(
      startPoint,
      endPoint,
      percent,
      offset,
    );
    const controlPoint2: IPoint = this.getControlPoint(
      startPoint,
      endPoint,
      percent,
      -offset,
    );

    return [controlPoint1, controlPoint2];
  };

  /**
   * control point calculated according to startPoint, endPoint, percent, and offset
   * @param  {IPoint} startPoint source point position of edge (x, y)
   * @param  {IPoint} endPoint  target point position of edge (x, y)
   * @param  {Number} percent   the proportion of control points' in the segment, Range 0 to 1
   * @param  {Number} offset    the curveOffset
   * @return {IPoint} control point (x,y) 
   */
=======
   * @param controlPoints the control point position 
=======
   * @param controlPoints the control point position
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
   * @param offset the curveOffset
   * @returns control points
   */
  protected getControlPoints: (
    startPoint: Point,
    endPoint: Point,
    percent: number,
    controlPoints: number[],
    offset: number,
  ) => [Point, Point] = (
    startPoint: Point,
    endPoint: Point,
    percent = 0.5,
    controlPoints,
    offset = 20,
  ) => {
    if ((startPoint.x - endPoint.x) * (startPoint.y - endPoint.y) < 0) {
      offset = -offset;
    }

    const controlPoint1: IPoint = this.getControlPoint(
      startPoint,
      endPoint,
      percent,
      offset,
    );
    const controlPoint2: IPoint = this.getControlPoint(
      startPoint,
      endPoint,
      percent,
      -offset,
    );

    return [controlPoint1, controlPoint2];
  };

  /**
<<<<<<< HEAD
 * 根据起始点、相对位置、偏移量计算控制点
 * @param  {IPoint} startPoint 起始点，包含 x,y
 * @param  {IPoint} endPoint  结束点, 包含 x,y
 * @param  {Number} percent   相对位置,范围 0-1
 * @param  {Number} offset    偏移量
 * @return {IPoint} 控制点，包含 x,y
 */
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
   * control point calculated according to startPoint, endPoint, percent, and offset
   * @param  {IPoint} startPoint source point position of edge (x, y)
   * @param  {IPoint} endPoint  target point position of edge (x, y)
   * @param  {Number} percent   the proportion of control points' in the segment, Range 0 to 1
   * @param  {Number} offset    the curveOffset
   * @return {IPoint} control point (x,y) 
   */
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
  protected getControlPoint: (
    startPoint: IPoint,
    endPoint: IPoint,
    percent: number,
    offset: number,
<<<<<<< HEAD
<<<<<<< HEAD
  ) => IPoint = (
    startPoint: IPoint,
    endPoint: IPoint,
    percent = 0,
    offset = 0,
  ) => {
=======
  ) => IPoint = 
  (startPoint: IPoint,
    endPoint: IPoint,
    percent = 0,
    offset = 0,
    ) => {

>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
  ) => IPoint = (
    startPoint: IPoint,
    endPoint: IPoint,
    percent = 0,
    offset = 0,
  ) => {
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
    const point: IPoint = {
      x: (1 - percent) * startPoint.x + percent * endPoint.x,
      y: 0,
    };

    let tangent: vec2 = [0, 0];
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
    vec2.normalize(tangent, [
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y,
    ]);
<<<<<<< HEAD
=======
    vec2.normalize(tangent, [endPoint.x - startPoint.x, endPoint.y - startPoint.y]);
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
>>>>>>> a952e826c4 (chore: lint fix & use English comments)

    if (!tangent || (!tangent[0] && !tangent[1])) {
      tangent = [0, 0];
    }
<<<<<<< HEAD
<<<<<<< HEAD
    const perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // Vertical vector
=======
    const perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // 垂直向量
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
    const perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // Vertical vector
>>>>>>> a952e826c4 (chore: lint fix & use English comments)

    point.x += perpendicular[0];
    point.y += perpendicular[1];

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
    if (Math.abs(point.x - startPoint.x) < Math.abs(point.x - endPoint.x)) {
      point.y += startPoint.y;
    } else {
      point.y += endPoint.y;
<<<<<<< HEAD
=======
    if(Math.abs(point.x - startPoint.x) < Math.abs(point.x - endPoint.x)) {
      point.y += startPoint.y 
    }else {
      point.y += endPoint.y 
>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
    }

    return point;
  };
<<<<<<< HEAD
<<<<<<< HEAD
=======



>>>>>>> 03c9a9db53 (feat: v5-cubic-horizon-edge)
=======
>>>>>>> a952e826c4 (chore: lint fix & use English comments)
}
