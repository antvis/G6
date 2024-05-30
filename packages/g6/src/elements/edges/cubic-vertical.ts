import type { DisplayObjectConfig } from '@antv/g';
import type { Point } from '../../types';
import { mergeOptions } from '../../utils/style';
import type { BaseEdgeStyleProps } from './base-edge';
import { Cubic } from './cubic';

/**
 * <zh/> 垂直方向的三次贝塞尔曲线样式配置项
 *
 * <en/> Cubic Bezier curve style properties in vertical direction
 */
export interface CubicVerticalStyleProps extends BaseEdgeStyleProps {
  /**
   * <zh/> 控制点在两端点连线上的相对位置，范围为`0-1`
   *
   * <en/> The relative position of the control point on the line, ranging from `0-1`
   * @defaultValue [0.5, 0.5]
   */
  curvePosition?: number | [number, number];
  /**
   * <zh/> 控制点距离两端点连线的距离，可理解为控制边的弯曲程度
   *
   * <en/> The distance of the control point from the line
   * @defaultValue [0, 0]
   */
  curveOffset?: number | [number, number];
}

/**
 * <zh/> 垂直方向的三次贝塞尔曲线
 *
 * <en/> Cubic Bezier curve in vertical direction
 * @remarks
 * <zh/> 特别注意，计算控制点时主要考虑 y 轴上的距离，忽略 x 轴的变化
 *
 * <en/> Please note that when calculating the control points, the distance on the y-axis is mainly considered, and the change on the x-axis is ignored
 */
export class CubicVertical extends Cubic {
  static defaultStyleProps: Partial<CubicVerticalStyleProps> = {
    curvePosition: [0.5, 0.5],
    curveOffset: [0, 0],
  };

  constructor(options: DisplayObjectConfig<CubicVerticalStyleProps>) {
    super(mergeOptions({ style: CubicVertical.defaultStyleProps }, options));
  }

  protected getControlPoints(
    sourcePoint: Point,
    targetPoint: Point,
    curvePosition: [number, number],
    curveOffset: [number, number],
  ): [Point, Point] {
    const yDist = targetPoint[1] - sourcePoint[1];
    return [
      [sourcePoint[0], sourcePoint[1] + yDist * curvePosition[0] + curveOffset[0]],
      [targetPoint[0], targetPoint[1] - yDist * curvePosition[1] + curveOffset[1]],
    ];
  }
}
