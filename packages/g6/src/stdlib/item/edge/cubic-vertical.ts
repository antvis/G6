import { vec2 } from '@antv/matrix-util';
import { Point } from '../../../types/common';
import { CubicEdge } from './cubic';

export class CubicVerticalEdge extends CubicEdge {
  public type = 'cubic-vertical-edge';

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
   * control point calculated according to startPoint, endPoint, percent, and offset
   * @param  {Point} startPoint source point position of edge (x, y)
   * @param  {Point} endPoint  target point position of edge (x, y)
   * @param  {Number} percent   the proportion of control points' in the segment, Range 0 to 1
   * @param  {Number} offset    the curveOffset
   * @param controlPoints the control point position
   * @returns control points
   */
  protected getControlPoints: (
    startPoint: Point,
    endPoint: Point,
    percent: number,
    controlPoints: Point[],
    offset: number,
  ) => Point[] = (
    startPoint: Point,
    endPoint: Point,
    percent = 0.5,
    controlPoints,
    offset,
  ) => {
    if (controlPoints?.length > 1) return controlPoints;
    const distanceToPoint = (startPoint.y - endPoint.y) * percent;
    const controlPoint1: Point = this.getControlPoint(
      startPoint,
      endPoint,
      distanceToPoint,
    );
    const controlPoint2: Point = this.getControlPoint(
      endPoint,
      startPoint,
      -distanceToPoint,
    );

    return [controlPoint1, controlPoint2];
  };

  /**
   * control point calculated according to startPoint, endPoint, percent, and offset
   * @param  {Point} startPoint source point position of edge (x, y)
   * @param  {Point} endPoint  target point position of edge (x, y)
   * @param  {Number} percent   the proportion of control points' in the segment, Range 0 to 1
   * @param  {Number} offset    the curveOffset
   * @return {Point} control point (x,y)
   */
  protected getControlPoint: (
    startPoint: Point,
    endPoint: Point,
    offset: number,
  ) => Point = (startPoint: Point, endPoint: Point, offset = 0) => {
    if (endPoint.y === startPoint.y || endPoint.x === startPoint.x) {
      return { x: startPoint.x, y: (startPoint.y + endPoint.y) / 2 };
    }
    const point: Point = {
      x: startPoint.x,
      y: startPoint.y - offset,
    };
    return point;
  };
}
