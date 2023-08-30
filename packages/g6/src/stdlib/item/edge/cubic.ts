import { DisplayObject } from '@antv/g';
import { vec2 } from '@antv/matrix-util';
import { Point } from '../../../types/common';
import { EdgeModelData, EdgeShapeMap } from '../../../types/edge';
import { State } from '../../../types/item';

import { EdgeDisplayModel } from '../../../types';
// eslint-disable-next-line import/namespace
import { BaseEdge } from './base';

export class CubicEdge extends BaseEdge {
  public type = 'cubic-edge';

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

  draw(
    model: EdgeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    [otherShapeId: string]: DisplayObject<any, any>;
    keyShape: DisplayObject<any, any>;
    labelShape?: DisplayObject<any, any>;
    iconShape?: DisplayObject<any, any>;
  } {
    const { data = {} } = model;

    const shapes: EdgeShapeMap = { keyShape: undefined };

    shapes.keyShape = this.drawKeyShape(
      model,
      sourcePoint,
      targetPoint,
      shapeMap,
      diffData,
    );

    if (data.haloShape) {
      shapes.haloShape = this.drawHaloShape(model, shapeMap, diffData);
    }

    if (data.labelShape) {
      shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
    }

    // labelBackgroundShape
    if (data.labelBackgroundShape) {
      shapes.labelBackgroundShape = this.drawLabelBackgroundShape(
        model,
        shapeMap,
        diffData,
      );
    }

    if (data.iconShape) {
      shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);
    }

    // TODO: other shapes
    return shapes;
  }

  public drawKeyShape(
    model: EdgeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ) {
    const { keyShape: keyShapeStyle } = this.mergedStyles as any;
    const { startArrow, endArrow, ...others } = keyShapeStyle;

    const controlPoints = this.getControlPoints(
      sourcePoint,
      targetPoint,
      keyShapeStyle.curvePosition,
      keyShapeStyle.controlPoints,
      keyShapeStyle.curveOffset,
    );

    const lineStyle = {
      ...others,
      path: [
        ['M', sourcePoint.x, sourcePoint.y],
        [
          'C',
          controlPoints[0].x,
          controlPoints[0].y,
          controlPoints[1].x,
          controlPoints[1].y,
          targetPoint.x,
          targetPoint.y,
        ],
      ],
    };
    this.upsertArrow('start', startArrow, others, model, lineStyle);
    this.upsertArrow('end', endArrow, others, model, lineStyle);

    return this.upsertShape('path', 'keyShape', lineStyle, shapeMap, model);
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
    controlPoints: Point[],
    offset: number,
  ) => Point[] = (
    startPoint: Point,
    endPoint: Point,
    percent = 0.5,
    controlPoints,
    offset = 20,
  ) => {
    if (controlPoints?.length > 1) return controlPoints;
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
    const perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // Vertical vector
    point.x += perpendicular[0];
    point.y += perpendicular[1];
    return point;
  };
}
