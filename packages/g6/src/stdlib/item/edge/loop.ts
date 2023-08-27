import { vec2 } from '@antv/matrix-util';
import { Tuple3Number } from '@antv/g';
import { getBBoxHeight, getBBoxWidth } from '../../../util/bbox';
import { distance } from '../../../util/point';
import { Point } from '../../../types/common';
import {
  EdgeDisplayModel,
  EdgeModelData,
  EdgeShapeMap,
} from '../../../types/edge';
import { State } from '../../../types/item';
import { CubicEdge } from './cubic';

enum LOOP_POSITION {
  'top' = 'top',
  'top-right' = 'top-right',
  'right' = 'right',
  'bottom-right' = 'bottom-right',
  'bottom' = 'bottom',
  'bottom-left' = 'bottom-left',
  'left' = 'left',
  'top-left' = 'top-left',
}

type LoopPosition = `${LOOP_POSITION}`;

type LoopCfg = {
  /** Specifies the relative position of the self-loop to the node. Default: top. */
  position?: LoopPosition;
  /** Determine the position from the edge of the node keyShape to the top of the self-loop, used to specify the curvature of the self-loop, the default is the height. */
  dist?: number;
  /** Specify whether to draw the ring clockwise. Default: true */
  clockwise?: boolean;
  /** For non-circular nodes, the offset between the connection point and the center coordinates of the node (top-right, bottom-right, top-left, bottom-left are special, which are four corner coordinates) in the x-axis or y-axis direction, The default is 1/4 of the minimum value of node width and high. */
  pointPadding?: number;
};

export class LoopEdge extends CubicEdge {
  public type = 'loop-edge';

  public defaultStyles = {
    keyShape: {
      x1: 0,
      y1: 0,
      z1: 0,
      x2: 0,
      y2: 0,
      z2: 0,
      isBillboard: true,
      loopCfg: {
        position: LOOP_POSITION.top,
        clockwise: true,
      },
    },
  };
  constructor(props) {
    super(props);
    // suggest to merge default styles like this to avoid style value missing
    // this.defaultStyles = mergeStyles([this.baseDefaultStyles, this.defaultStyles]);
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
    const { startPoint, endPoint, controlPoints } = this.getPathPoints(
      model,
      sourcePoint,
      targetPoint,
      keyShapeStyle.loopCfg,
    );

    const { startArrow, endArrow, ...others } = keyShapeStyle;

    const lineStyle = {
      ...keyShapeStyle,
      path: [
        ['M', startPoint.x, startPoint.y],
        [
          'C',
          controlPoints[0].x,
          controlPoints[0].y,
          controlPoints[1].x,
          controlPoints[1].y,
          endPoint.x,
          endPoint.y,
        ],
      ],
    };

    this.upsertArrow('start', startArrow, others, model, lineStyle);
    this.upsertArrow('end', endArrow, others, model, lineStyle);
    return this.upsertShape('path', 'keyShape', lineStyle, shapeMap, model);
  }

  private getPathPoints(
    model: EdgeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
    loopCfg: LoopCfg,
  ): {
    startPoint: Point;
    endPoint: Point;
    controlPoints: [Point, Point];
  } {
    const { source: sourceNodeId, target: targetNodeId } = model;

    if (sourceNodeId !== targetNodeId) {
      throw new Error();
    }

    const item = this.nodeMap.get(sourceNodeId);
    const shapeType = item.shapeMap.keyShape.nodeName;
    const bbox = item.getKeyBBox();
    const width = getBBoxWidth(bbox);
    const height = getBBoxHeight(bbox);
    const halfOfHeight = height / 2;
    const halfOfWidth = width / 2;

    const center = bbox.center;
    let startPoint: vec2 = [sourcePoint.x, sourcePoint.y];
    let endPoint: vec2 = [targetPoint.x, targetPoint.y];

    // The relative position relationship between self-loop edge and keyShape.
    const position: LoopPosition = loopCfg.position || LOOP_POSITION.top;

    if (startPoint[0] === endPoint[0] && startPoint[1] === endPoint[1]) {
      if (shapeType === 'circle' || shapeType === 'ellipse') {
        [startPoint, endPoint] = calculatePointForEllipse(
          position,
          center,
          halfOfWidth,
          halfOfHeight,
        );
      } else {
        [startPoint, endPoint] = calculatePointForOtherShapes(
          position,
          center,
          halfOfWidth,
          halfOfHeight,
          loopCfg.pointPadding,
        );
      }
      // If drawing counterclockwise, swap start and end points。
      if (loopCfg.clockwise === false) {
        const swap = startPoint;
        startPoint = endPoint;
        endPoint = swap;
      }
    }

    // The distance from the edge of the keyShape
    const dist: number = loopCfg.dist || Math.max(width, height) * 2;

    const startVec: vec2 = [
      startPoint[0] - center[0],
      startPoint[1] - center[1],
    ];
    const endVec: vec2 = [endPoint[0] - center[0], endPoint[1] - center[1]];
    const rstart = distance([0, 0], startVec);
    const rend = distance([0, 0], endVec);
    const scaleRateStart = (rstart + dist) / rstart;
    const scaleRateEnd = (rend + dist) / rend;
    const startExtendVec = vec2.scale([0, 0], startVec, scaleRateStart);
    const endExtendVec = vec2.scale([0, 0], endVec, scaleRateEnd);
    const controlPoints = [
      { x: center[0] + startExtendVec[0], y: center[1] + startExtendVec[1] },
      { x: center[0] + endExtendVec[0], y: center[1] + endExtendVec[1] },
    ] as [Point, Point];

    return {
      startPoint: { x: startPoint[0], y: startPoint[1] },
      endPoint: { x: endPoint[0], y: endPoint[1] },
      controlPoints,
    };
  }
}

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
const calculatePointForEllipse = (
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
const calculatePointForOtherShapes = (
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
    [LOOP_POSITION['top-right']]: [
      [center[0] + halfOfWidth - pointPadding, center[1] - halfOfHeight],
      [center[0] + halfOfWidth, center[1] - halfOfHeight + pointPadding],
    ],
    [LOOP_POSITION.right]: [
      [center[0] + halfOfWidth, center[1] - pointPadding],
      [center[0] + halfOfWidth, center[1] + pointPadding],
    ],
    [LOOP_POSITION['bottom-right']]: [
      [center[0] + halfOfWidth, center[1] + halfOfHeight - pointPadding],
      [center[0] + halfOfWidth - pointPadding, center[1] + halfOfHeight],
    ],
    [LOOP_POSITION.bottom]: [
      [center[0] + pointPadding, center[1] + halfOfHeight],
      [center[0] - pointPadding, center[1] + halfOfHeight],
    ],
    [LOOP_POSITION['bottom-left']]: [
      [center[0] - halfOfWidth + pointPadding, center[1] + halfOfHeight],
      [center[0] - halfOfWidth, center[1] + halfOfHeight - pointPadding],
    ],
    [LOOP_POSITION.left]: [
      [center[0] - halfOfWidth, center[1] + pointPadding],
      [center[0] - halfOfWidth, center[1] - pointPadding],
    ],
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
const getPointOnEllipseAtAngle = (
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
const getPointsOnEllipseAtAngles = (
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
