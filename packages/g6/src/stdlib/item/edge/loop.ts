import { vec2 } from 'gl-matrix';
import { Point } from '../../../types/common';
import { EdgeDisplayModel, EdgeModelData, EdgeShapeMap } from '../../../types/edge';
import { State } from '../../../types/item';
import { LOOP_POSITION, LoopCfg, LoopPosition } from '../../../types/loop';
import { getBBoxHeight, getBBoxWidth } from '../../../utils/bbox';
import { calculatePointForEllipse, calculatePointForOtherShapes } from '../../../utils/loop';
import { distanceVec } from '../../../utils/point';
import { CubicEdge } from './cubic';

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
        ['C', controlPoints[0].x, controlPoints[0].y, controlPoints[1].x, controlPoints[1].y, endPoint.x, endPoint.y],
      ],
    };

    this.upsertArrow('start', startArrow, others, model, lineStyle);
    this.upsertArrow('end', endArrow, others, model, lineStyle);
    return this.upsertShape('path', 'keyShape', lineStyle, {
      model,
      shapeMap,
      diffData,
      diffState,
    });
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
        [startPoint, endPoint] = calculatePointForEllipse(position, center, halfOfWidth, halfOfHeight);
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

    const startVec: vec2 = [startPoint[0] - center[0], startPoint[1] - center[1]];
    const endVec: vec2 = [endPoint[0] - center[0], endPoint[1] - center[1]];
    const rstart = distanceVec([0, 0], startVec);
    const rend = distanceVec([0, 0], endVec);
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
