import type { DisplayObjectConfig } from '@antv/g';
import type { NodeData } from '../../spec';
import type { Point } from '../../types';
import { positionOf } from '../../utils/position';
import { mergeOptions } from '../../utils/style';
import { distance, rad, subtract } from '../../utils/vector';
import type { CubicStyleProps } from './cubic';
import { Cubic } from './cubic';

/**
 * <zh/> 径向贝塞尔曲线样式配置项
 *
 * <en/> Radial cubic style props
 */
export interface CubicRadialStyleProps extends CubicStyleProps {}

/**
 * <zh/> 径向贝塞尔曲线
 *
 * <en/> Radial cubic edge
 */
export class CubicRadial extends Cubic {
  static defaultStyleProps: Partial<CubicStyleProps> = {
    curvePosition: 0.5,
    curveOffset: 20,
  };

  constructor(options: DisplayObjectConfig<CubicStyleProps>) {
    super(mergeOptions({ style: CubicRadial.defaultStyleProps }, options));
  }

  private get ref(): NodeData {
    return this.context.model.getRootsData()[0];
  }

  protected getEndpoints(attributes: Required<CubicStyleProps>): [Point, Point] {
    if (this.sourceNode.id === this.ref.id) {
      return super.getEndpoints(attributes);
    }

    const refPoint = positionOf(this.ref);
    const sourcePoint = this.sourceNode.getIntersectPoint(refPoint, true);
    const targetPoint = this.targetNode.getIntersectPoint(refPoint);

    return [sourcePoint, targetPoint];
  }

  private toRadialCoordinate(p: Point) {
    const refPoint = positionOf(this.ref);
    const r = distance(p, refPoint);
    const radian = rad(subtract(p, refPoint));
    return [r, radian];
  }

  protected getControlPoints(
    sourcePoint: Point,
    targetPoint: Point,
    curvePosition: [number, number],
    curveOffset: [number, number],
  ): [Point, Point] {
    const [r1, rad1] = this.toRadialCoordinate(sourcePoint);
    const [r2] = this.toRadialCoordinate(targetPoint);

    const rDist = r2 - r1;

    return [
      [
        sourcePoint[0] + (rDist * curvePosition[0] + curveOffset[0]) * Math.cos(rad1),
        sourcePoint[1] + (rDist * curvePosition[0] + curveOffset[0]) * Math.sin(rad1),
      ],
      [
        targetPoint[0] - (rDist * curvePosition[1] - curveOffset[0]) * Math.cos(rad1),
        targetPoint[1] - (rDist * curvePosition[1] - curveOffset[0]) * Math.sin(rad1),
      ],
    ];
  }
}
