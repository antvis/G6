import { isEmpty, mix } from '@antv/util';
import { ID } from '@antv/graphlib';
import { Point } from '../../../types/common';
import {
  EdgeDisplayModel,
  EdgeModelData,
  EdgeShapeMap,
} from '../../../types/edge';
import { State } from '../../../types/item';
import { getPolylinePath } from '../../../util/polyline';
import { pathFinder } from '../../../util/router';
import Node from '../../../item/node';
import { LineEdge } from './line';
export class PolylineEdge extends LineEdge {
  public type = 'polyline-edge';
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
  public draw(
    model: EdgeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
    shapeMap: EdgeShapeMap,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): EdgeShapeMap {
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
  private getControlPoints(
    model: EdgeDisplayModel,
    sourcePoint: Point,
    targetPoint: Point,
  ): Point[] {
    const { keyShape: keyShapeStyle } = this.mergedStyles as any;
    return keyShapeStyle.controlPoints;
  }
  /**
   * Get polyline path
   * @param model edge display model
   * @param points lists of given 2d points
   * @param radius radius of corner
   * @param routeCfg router config
   * @param auto whether calculate the path with A*
   * @returns
   */
  protected getPath(
    model: EdgeDisplayModel,
    points: Point[],
    radius: number,
    routeCfg?: Record<string, any>,
    auto?: boolean,
  ): string {
    const { id: edgeId, source: sourceNodeId, target: targetNodeId } = model;

    // Draw a polyline with control points
    if (!auto) return getPolylinePath(edgeId, points, radius);

    // Find the shortest path computed by A* routing algorithm
    const polylinePoints = pathFinder(
      sourceNodeId,
      targetNodeId,
      this.nodeMap as unknown as Map<ID, Node>,
      routeCfg,
    );

    return getPolylinePath(edgeId, polylinePoints, radius);
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
    const controlPoints = this.getControlPoints(
      model,
      sourcePoint,
      targetPoint,
    );

    let points = [sourcePoint, targetPoint];
    if (controlPoints) {
      points = [sourcePoint, ...controlPoints, targetPoint];
    }

    const routeCfg = mix(
      {},
      { offset: keyShapeStyle.offset },
      keyShapeStyle.routeCfg,
    );

    const path = this.getPath(
      model,
      points,
      keyShapeStyle.radius,
      routeCfg,
      isEmpty(controlPoints),
    );

    const { startArrow, endArrow, ...others } = keyShapeStyle;
    const lineStyle = {
      ...others,
      path,
      isBillboard: true,
    };
    this.upsertArrow('start', startArrow, others, model, lineStyle);
    this.upsertArrow('end', endArrow, others, model, lineStyle);
    return this.upsertShape('path', 'keyShape', lineStyle, shapeMap, model);
  }
}
