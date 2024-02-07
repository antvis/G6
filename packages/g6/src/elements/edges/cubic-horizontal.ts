import type { DisplayObjectConfig } from '@antv/g';
import { deepMix } from '@antv/util';
import type { BaseEdgeProps, Point } from '../../types';
import type { BaseEdgeStyleProps } from './base-edge';
import { Cubic } from './cubic';

type CubicHorizontalKeyStyleProps = BaseEdgeProps<{
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
}>;
export type CubicHorizontalStyleProps = BaseEdgeStyleProps<CubicHorizontalKeyStyleProps>;
type CubicHorizontalOptions = DisplayObjectConfig<CubicHorizontalStyleProps>;

export class CubicHorizontal extends Cubic {
  static defaultStyleProps: Partial<CubicHorizontalStyleProps> = {
    curvePosition: [0.5, 0.5],
    curveOffset: [0, 0],
  };

  constructor(options: CubicHorizontalOptions) {
    super(deepMix({}, { style: CubicHorizontal.defaultStyleProps }, options));
  }

  protected getControlPoints(
    sourcePoint: Point,
    targetPoint: Point,
    curvePosition: [number, number],
    curveOffset: [number, number],
  ): [Point, Point] {
    const xDist = targetPoint[0] - sourcePoint[0];
    return [
      [sourcePoint[0] + xDist * curvePosition[0] + curveOffset[0], sourcePoint[1]],
      [targetPoint[0] - xDist * curvePosition[1] + curveOffset[1], targetPoint[1]],
    ];
  }
}
