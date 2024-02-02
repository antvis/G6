import type { DisplayObjectConfig, Group, PathStyleProps } from '@antv/g';
import { Path } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Point } from '../../types';
import { calculateControlPoint, getCubicPath, parseCurveOffset, parseCurvePosition } from '../../utils/edge';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

type CubicKeyStyleProps = PathStyleProps & {
  /**
   * <zh/> 边的起点
   * <en/> The source point. Represents the start of the edge
   */
  sourcePoint: Point;
  /**
   * <zh/> 边的终点
   * <en/> The target point. Represents the end of the edge
   */
  targetPoint: Point;
  /**
   * <zh/> 控制点数组，用于定义曲线的形状。如果不指定，将会通过`curveOffset`和`curvePosition`来计算控制点
   * <en/> Control points. Used to define the shape of the curve. If not specified, it will be calculated using `curveOffset` and `curvePosition`.
   */
  controlPoints?: [Point, Point];
  /**
   * <zh/> 控制点在两端点连线上的相对位置，范围为`0-1`
   * <en/> The relative position of the control point on the line, ranging from `0-1`
   */
  curvePosition?: number | [number, number];
  /**
   * <zh/> 控制点距离两端点连线的距离，可理解为控制边的弯曲程度
   * <en/> The distance of the control point from the line
   */
  curveOffset?: number | [number, number];
};

export type CubicStyleProps = BaseEdgeStyleProps<CubicKeyStyleProps>;

type ParsedCubicStyleProps = Required<CubicStyleProps>;

type CubicOptions = DisplayObjectConfig<CubicStyleProps>;

export class Cubic extends BaseEdge<PathStyleProps, Path> {
  static defaultStyleProps: Partial<CubicStyleProps> = {
    curvePosition: [0.5, 0.5],
    curveOffset: [-20, 20],
  };

  constructor(options: CubicOptions) {
    super(deepMix({}, { style: Cubic.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: ParsedCubicStyleProps, container: Group): Path | undefined {
    return this.upsert('key', Path, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedCubicStyleProps): PathStyleProps {
    const { sourcePoint, targetPoint, controlPoints, curvePosition, curveOffset, ...keyStyle } = super.getKeyStyle(
      attributes,
    ) as Required<CubicKeyStyleProps>;

    const actualControlPoints = this.getControlPoints(
      sourcePoint,
      targetPoint,
      parseCurvePosition(curvePosition),
      parseCurveOffset(curveOffset),
      controlPoints,
    );

    return {
      ...keyStyle,
      path: getCubicPath(sourcePoint, targetPoint, actualControlPoints),
    };
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
          calculateControlPoint(sourcePoint, targetPoint, curvePosition[0], curveOffset[0]),
          calculateControlPoint(sourcePoint, targetPoint, curvePosition[1], curveOffset[1]),
        ];
  }
}
