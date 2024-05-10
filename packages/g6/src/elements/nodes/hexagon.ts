import type { DisplayObjectConfig } from '@antv/g';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point } from '../../types';
import { getHexagonPoints } from '../../utils/element';
import type { IconStyleProps, PolygonStyleProps } from '../shapes';
import { Polygon } from '../shapes/polygon';

/**
 * <zh/> 六边形节点样式配置项
 *
 * <en/> Hexagon node style props
 */
export interface HexagonStyleProps extends PolygonStyleProps {
  /**
   * <zh/> 外半径，默认为宽高的最小值的一半
   *
   * <en/> outer radius, default is half of the minimum value of width and height
   */
  outerR?: number;
}

/**
 * <zh/> 六边形节点
 *
 * <en/> Hexagon node
 */
export class Hexagon extends Polygon<HexagonStyleProps> {
  constructor(options: DisplayObjectConfig<HexagonStyleProps>) {
    super(options);
  }

  private getOuterR(attributes: Required<HexagonStyleProps>): number {
    return attributes.outerR || Math.min(...this.getSize(attributes)) / 2;
  }

  protected getPoints(attributes: Required<HexagonStyleProps>): Point[] {
    return getHexagonPoints(this.getOuterR(attributes));
  }

  protected getIconStyle(attributes: Required<HexagonStyleProps>): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const size = this.getOuterR(attributes) * ICON_SIZE_RATIO;
    return style ? ({ width: size, height: size, ...style } as IconStyleProps) : false;
  }
}
