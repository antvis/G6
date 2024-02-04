import type { DisplayObjectConfig, Group, PathStyleProps } from '@antv/g';
import { Path } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Point } from '../../types';
import { getPolylinePath } from '../../utils/edge';
import type { BaseEdgeKeyStyleProps, BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

type PolylineKeyStyleProps = BaseEdgeKeyStyleProps<PathStyleProps> & {
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
