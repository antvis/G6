import type { DisplayObjectConfig } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Point } from '../../types';
import type { BaseEdgeStyleProps } from './base-edge';
import { Cubic } from './cubic';

type CubicVerticalKeyStyleProps = {
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

export type CubicVerticalStyleProps = BaseEdgeStyleProps<CubicVerticalKeyStyleProps>;

type CubicVerticalOptions = DisplayObjectConfig<CubicVerticalStyleProps>;

export class CubicVertical extends Cubic {
  static defaultStyleProps: Partial<CubicVerticalStyleProps> = {
    curvePosition: [0.5, 0.5],
    curveOffset: [0, 0],
  };

  constructor(options: CubicVerticalOptions) {
    super(deepMix({}, { style: CubicVertical.defaultStyleProps }, options));
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
