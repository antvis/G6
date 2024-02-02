import type { DisplayObjectConfig, Group, PathStyleProps } from '@antv/g';
import { Path } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Point } from '../../types';
import { getPolylinePath } from '../../utils/edge';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

type PolylineKeyStyleProps = PathStyleProps & {
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
   * <zh/> 拐弯处的圆角弧度，默认为 0
   * <en/> The radius of the rounded corner at the turning point. The default is 0
   */
  radius?: number;
  /**
   * <zh/> 控制点数组。如果不指定，将会根据 A* 算法自动生成折线
   */
  controlPoints?: Point[];
};

export type PolylineStyleProps = BaseEdgeStyleProps<PolylineKeyStyleProps>;

type ParsedPolylineStyleProps = Required<PolylineStyleProps>;

type PolylineOptions = DisplayObjectConfig<PolylineStyleProps>;

export class Polyline extends BaseEdge<PathStyleProps, Path> {
  static defaultStyleProps: Partial<PolylineStyleProps> = {
    radius: 0,
    isBillboard: true,
  };

  constructor(options: PolylineOptions) {
    super(deepMix({}, { style: Polyline.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: ParsedPolylineStyleProps, container: Group): Path | undefined {
    return this.upsert('key', Path, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedPolylineStyleProps): PathStyleProps {
    const { sourcePoint, targetPoint, controlPoints, radius, ...keyStyle } = super.getKeyStyle(
      attributes,
    ) as Required<PolylineKeyStyleProps>;

    return {
      ...keyStyle,
      path: getPolylinePath(sourcePoint, targetPoint, controlPoints, radius),
    };
  }
}
