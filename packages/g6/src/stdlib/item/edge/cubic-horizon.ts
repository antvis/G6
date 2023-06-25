import { off } from 'process';
import { DisplayObject, Line } from '@antv/g';
import { EdgeDisplayModel } from 'types';
import { Point } from 'types/common';
import { EdgeModelData, EdgeShapeMap } from 'types/edge';
import { State } from 'types/item';
import { IPoint } from '@antv/g6';
import { vec2 } from '@antv/matrix-util';
import { BaseEdge } from './base';
import { CubicEdge } from './cubic';

export class CubicHorizonEdge extends CubicEdge {
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
  protected getControlPoint: (
    startPoint: IPoint,
    endPoint: IPoint,
    percent: number,
    offset: number,
  ) => IPoint = (
    startPoint: IPoint,
    endPoint: IPoint,
    percent = 0,
    offset = 0,
  ) => {
    const point: IPoint = {
      x: (1 - percent) * startPoint.x + percent * endPoint.x,
      y: 0,
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

    if (Math.abs(point.x - startPoint.x) < Math.abs(point.x - endPoint.x)) {
      point.y += startPoint.y;
    } else {
      point.y += endPoint.y;
    }

    return point;
  };
}
