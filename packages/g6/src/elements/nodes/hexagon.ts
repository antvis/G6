import type { DisplayObjectConfig } from '@antv/g';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point } from '../../types';
import { getHexagonPoints } from '../../utils/element';
import type { IconStyleProps } from '../shapes';
import type { PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

export type HexagonStyleProps = PolygonStyleProps<{
  /**
   * <zh/> 外半径
   * <en/> outer radius
   */
  outerR?: number;
}>;

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
