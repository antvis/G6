import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';
import type { Point } from '../../types';
import { getCubicPath, getCurveControlPoint, parseCurveOffset, parseCurvePosition } from '../../utils/edge';
import { mergeOptions } from '../../utils/style';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

/**
 * <zh/> 三次贝塞尔曲线样式配置项
 *
 * <en/> Cubic Bezier curve style properties
 */
export interface CubicStyleProps extends BaseEdgeStyleProps {
  /**
   * <zh/> 控制点数组，用于定义曲线的形状。如果不指定，将会通过 `curveOffset` 和 `curvePosition` 来计算控制点
   *
   * <en/> Control points. Used to define the shape of the curve. If not specified, it will be calculated using `curveOffset` and `curvePosition`.
   */
  controlPoints?: [Point, Point];
  /**
   * <zh/> 控制点在两端点连线上的相对位置，范围为`0-1`
   *
   * <en/> The relative position of the control point on the line, ranging from `0-1`
   * @defaultValue 0.5
   */
  curvePosition?: number | [number, number];
  /**
   * <zh/> 控制点距离两端点连线的距离，可理解为控制边的弯曲程度
   *
   * <en/> The distance of the control point from the line
   * @defaultValue 20
   */
  curveOffset?: number | [number, number];
}

type ParsedCubicStyleProps = Required<CubicStyleProps>;

/**
 * <zh/> 三次贝塞尔曲线
 *
 * <en/> Cubic Bezier curve
 */
export class Cubic extends BaseEdge {
  static defaultStyleProps: Partial<CubicStyleProps> = {
    curvePosition: 0.5,
    curveOffset: 20,
  };

  constructor(options: DisplayObjectConfig<CubicStyleProps>) {
    super(mergeOptions({ style: Cubic.defaultStyleProps }, options));
  }

  /**
   * @inheritdoc
   */
  protected getKeyPath(attributes: ParsedCubicStyleProps): PathArray {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    const { controlPoints, curvePosition, curveOffset } = attributes;

    const actualControlPoints = this.getControlPoints(
      sourcePoint,
      targetPoint,
      parseCurvePosition(curvePosition),
      parseCurveOffset(curveOffset),
      controlPoints,
    );

    return getCubicPath(sourcePoint, targetPoint, actualControlPoints);
  }

  protected getControlPoints(
    sourcePoint: Point,
    targetPoint: Point,
    curvePosition: [number, number],
    curveOffset: [number, number],
    controlPoints?: [Point, Point],
  ): [Point, Point] {
    return controlPoints?.length === 2
      ? controlPoints
      : [
          getCurveControlPoint(sourcePoint, targetPoint, curvePosition[0], curveOffset[0]),
          getCurveControlPoint(sourcePoint, targetPoint, curvePosition[1], curveOffset[1]),
        ];
  }
}
