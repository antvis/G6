import type { DisplayObjectConfig, Group, PathStyleProps } from '@antv/g';
import { Path } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Point } from '../../types';
import { getQuadraticPath } from '../../utils/edge';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

type QuadraticKeyStyleProps = PathStyleProps & {
  /**
   * <zh/> 边的起点
   * <en/> The source point. Represents the start of the edge
   */
  sourcePoint?: Point;
  /**
   * <zh/> 边的终点
   * <en/> The target point. Represents the end of the edge
   */
  targetPoint?: Point;
  /**
   * <zh/> 控制点，用于定义曲线的形状。如果不指定，将会通过`curveOffset`和`curvePosition`来计算控制点
   * <en/> Control point. Used to define the shape of the curve. If not specified, it will be calculated using `curveOffset` and `curvePosition`.
   */
  controlPoint?: Point;
  /**
   * <zh/> 控制点在两端点连线上的相对位置，范围为`0-1`
   * <en/> The relative position of the control point on the line, ranging from `0-1`
   */
  curvePosition?: number;
  /**
   * <zh/> 控制点距离两端点连线的距离，可理解为控制边的弯曲程度
   * <en/> The distance of the control point from the line
   */
  curveOffset?: number;
};

export type QuadraticStyleProps = BaseEdgeStyleProps<QuadraticKeyStyleProps>;

type ParsedQuadraticStyleProps = Required<QuadraticStyleProps>;

type QuadraticOptions = DisplayObjectConfig<QuadraticStyleProps>;

export class Quadratic extends BaseEdge<PathStyleProps, Path> {
  static defaultStyleProps: Partial<QuadraticStyleProps> = {
    curvePosition: 0.5,
    curveOffset: 30,
  };

  constructor(options: QuadraticOptions) {
    super(deepMix({}, { style: Quadratic.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: ParsedQuadraticStyleProps, container: Group): Path | undefined {
    return this.upsert('key', Path, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedQuadraticStyleProps): PathStyleProps {
    const { sourcePoint, targetPoint, controlPoint, curvePosition, curveOffset, ...keyStyle } = super.getKeyStyle(
      attributes,
    ) as Required<QuadraticKeyStyleProps>;

    return {
      ...keyStyle,
      path: getQuadraticPath(sourcePoint, targetPoint, curvePosition, curveOffset, controlPoint),
    };
  }
}
