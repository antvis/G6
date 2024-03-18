import type { DisplayObjectConfig } from '@antv/g';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point } from '../../types';
import { getHexagonPoints } from '../../utils/element';
import type { IconStyleProps } from '../shapes';
import type { ParsedPolygonStyleProps, PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

export type HexagonStyleProps = PolygonStyleProps & ExtendsStyleProps;
type ParsedHexagonStyleProps = ParsedPolygonStyleProps & Required<HexagonStyleProps>;
type ExtendsStyleProps = {
  /**
   * <zh/> 外半径
   * <en/> outer radius
   */
  outerR?: number;
};

export class Hexagon extends Polygon {
  constructor(options: DisplayObjectConfig<HexagonStyleProps>) {
    super(options);
  }

  private getOuterR(attributes: ParsedHexagonStyleProps): number {
    return attributes.outerR || Math.min(...this.getSize(attributes)) / 2;
  }

  protected getPoints(attributes: ParsedHexagonStyleProps): Point[] {
    return getHexagonPoints(this.getOuterR(attributes));
  }

  protected getIconStyle(attributes: ParsedHexagonStyleProps): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const size = this.getOuterR(attributes) * ICON_SIZE_RATIO;
    return style ? ({ width: size, height: size, ...style } as IconStyleProps) : false;
  }
}
