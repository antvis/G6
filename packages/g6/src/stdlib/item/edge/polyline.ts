import { isArray, isEmpty, isString, mix } from '@antv/util';
import { ShapeStyle } from '@antv/g6';
import { Point } from '../../../types/common';
import {
  EdgeDisplayModel,
  EdgeModelData,
  EdgeShapeMap,
} from '../../../types/edge';
import { State } from '../../../types/item';
import { getPolylinePath } from '../../../util/polyline';
import { pathFinder } from '../../../util/router';
import { LineEdge } from './line';

export class Polyline extends LineEdge {
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

  getControlPoints(): Point[] {
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
    const { offset } = routeCfg;
    const { id: edgeId } = model;

    // Draw a polyline according to the set control points
    if (!offset || !auto) return getPolylinePath(edgeId, points, radius);

    // Calculate the shortest path according to the A star routing algorithm
    const sourcePoint = points[0];
    const targetPoint = points[points.length - 1];

    const sourceNode = this.nodeMap[model.source];
    const targetNode = this.nodeMap[model.target];

    const polylinePoints = pathFinder(
      sourcePoint,
      targetPoint,
      sourceNode,
      targetNode,
      this.nodeMap,
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

    const controlPoints = this.getControlPoints();

    let points = [sourcePoint, targetPoint];
    if (controlPoints) {
      points = [sourcePoint, ...controlPoints, targetPoint];
    }

    const routeCfg = mix(
      {},
      { offset: keyShapeStyle.offset },
      keyShapeStyle.routeCfg,
    );

    let path = this.getPath(
      model,
      points,
      keyShapeStyle.radius,
      routeCfg,
      isEmpty(controlPoints),
    );

    if (
      (isArray(path) && path.length <= 1) ||
      (isString(path) && path.indexOf('L') === -1)
    ) {
      path = 'M 0 0, L0 0';
    }
    if (
      isNaN(sourcePoint.x) ||
      isNaN(sourcePoint.y) ||
      isNaN(targetPoint.x) ||
      isNaN(targetPoint.y)
    ) {
      path = 'M 0 0, L0 0';
    }

    const attrs: ShapeStyle = mix({}, keyShapeStyle, {
      path,
    });

    return this.upsertShape('path', 'keyShape', attrs, shapeMap, model);
  }
}
