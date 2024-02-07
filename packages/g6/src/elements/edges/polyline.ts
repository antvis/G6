import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';
import { deepMix } from '@antv/util';
import type { BaseEdgeProps, Point } from '../../types';
import { getPolylinePath } from '../../utils/edge';
import type { BaseEdgeStyleProps, ParsedBaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

type PolylineKeyStyleProps = BaseEdgeProps<{
  /**
   * <zh/> 拐角半径
   * <en/> The radius of the rounded corner
   */
  radius?: number;
  /**
   * <zh/> 控制点数组。如果不指定，将会根据 A* 算法自动生成折线
   * <en/> Control point array. If not specified, the polyline will be automatically generated according to the A* algorithm
   */
  controlPoints?: Point[];
}>;
export type PolylineStyleProps = BaseEdgeStyleProps<PolylineKeyStyleProps>;
type PolylineOptions = DisplayObjectConfig<PolylineStyleProps>;

export class Polyline extends BaseEdge<PolylineKeyStyleProps> {
  static defaultStyleProps: Partial<PolylineStyleProps> = {
    radius: 0,
  };

  constructor(options: PolylineOptions) {
    super(deepMix({}, { style: Polyline.defaultStyleProps }, options));
  }

  protected getKeyPath(attributes: ParsedBaseEdgeStyleProps<PolylineKeyStyleProps>): PathArray {
    const { controlPoints, radius } = attributes;
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    return getPolylinePath(sourcePoint, targetPoint, controlPoints, radius);
  }
}
