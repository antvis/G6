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
    controlPoints: number[],
    offset: number,
  ) => [Point, Point] = (
    startPoint: Point,
    endPoint: Point,
    percent = 0.5,
    controlPoints,
    offset = 20,
  ) => {
    if ((startPoint.x - endPoint.x) * (startPoint.y - endPoint.y) > 0) {
      offset = -offset;
    }

    const controlPoint1: Point = this.getControlPoint(
      startPoint,
      endPoint,
      percent,
      offset,
    );
    const controlPoint2: Point = this.getControlPoint(
      startPoint,
      endPoint,
      percent,
      -offset,
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
    percent: number,
    offset: number,
  ) => Point = (
    startPoint: Point,
    endPoint: Point,
    percent = 0,
    offset = 0,
  ) => {
    const point: Point = {
      x: 0,
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

    const perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // Vertical vector

    point.x += perpendicular[0];
    point.y += perpendicular[1];

    if (Math.abs(point.y - startPoint.y) < Math.abs(point.y - endPoint.y)) {
      point.x += startPoint.x;
    } else {
      point.x += endPoint.x;
    }

    return point;
  };
}
