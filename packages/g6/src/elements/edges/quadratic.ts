import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';
import type { Point } from '../../types';
import { getCurveControlPoint, getQuadraticPath } from '../../utils/edge';
import { mergeOptions } from '../../utils/style';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

/**
 * <zh/> 二次贝塞尔曲线样式配置项
 *
 * <en/> Quadratic Bezier curve style properties
 */
export interface QuadraticStyleProps extends BaseEdgeStyleProps {
  /**
   * <zh/> 控制点，用于定义曲线的形状。如果不指定，将会通过`curveOffset`和`curvePosition`来计算控制点
   *
   * <en/> Control point. Used to define the shape of the curve. If not specified, it will be calculated using `curveOffset` and `curvePosition`.
   */
  controlPoint?: Point;
  /**
   * <zh/> 控制点在两端点连线上的相对位置，范围为`0-1`
   *
   * <en/> The relative position of the control point on the line, ranging from `0-1`
   * @defaultValue 0.5
   */
  curvePosition?: number;
  /**
   * <zh/> 控制点距离两端点连线的距离，可理解为控制边的弯曲程度
   *
   * <en/> The distance of the control point from the line
   * @defaultValue 30
   */
  curveOffset?: number;
}

type ParsedQuadraticStyleProps = Required<QuadraticStyleProps>;

/**
 * <zh/> 二次贝塞尔曲线
 *
 * <en/> Quadratic Bezier curve
 */
export class Quadratic extends BaseEdge {
  static defaultStyleProps: Partial<QuadraticStyleProps> = {
    curvePosition: 0.5,
    curveOffset: 30,
  };

  constructor(options: DisplayObjectConfig<QuadraticStyleProps>) {
    super(mergeOptions({ style: Quadratic.defaultStyleProps }, options));
  }

  protected getKeyPath(attributes: ParsedQuadraticStyleProps): PathArray {
    const { curvePosition, curveOffset } = attributes;
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    const controlPoint =
      attributes.controlPoint || getCurveControlPoint(sourcePoint, targetPoint, curvePosition, curveOffset);
    return getQuadraticPath(sourcePoint, targetPoint, controlPoint);
  }
}
