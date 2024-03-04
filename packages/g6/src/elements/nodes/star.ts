import type { DisplayObjectConfig } from '@antv/g';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point, StarPortPosition } from '../../types';
import { getPortPosition, getStarPoints, getStarPorts } from '../../utils/element';
import type { IconStyleProps } from '../shapes';
import { NodePortStyleProps } from './base-node';
import type { ParsedPolygonStyleProps, PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

export type StarStyleProps = PolygonStyleProps & ExtendsStyleProps;
type ParsedStarStyleProps = ParsedPolygonStyleProps & Required<ExtendsStyleProps>;
type ExtendsStyleProps = {
  /**
   * <zh/> 内半径
   * <en/> Inner radius
   */
  innerR?: number;
};

export class Star extends Polygon {
  constructor(options: DisplayObjectConfig<StarStyleProps>) {
    super(options);
  }

  private getInnerR(attributes: ParsedStarStyleProps): number {
    return attributes.innerR || (this.getOuterR(attributes) * 3) / 8;
  }

  private getOuterR(attributes: ParsedStarStyleProps): number {
    return Math.min(...this.getSize(attributes)) / 2;
  }

  protected getPoints(attributes: ParsedStarStyleProps): Point[] {
    return getStarPoints(this.getOuterR(attributes), this.getInnerR(attributes));
  }

  protected getIconStyle(attributes: ParsedStarStyleProps): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const size = this.getInnerR(attributes) * 2 * ICON_SIZE_RATIO;
    return style ? ({ width: size, height: size, ...style } as IconStyleProps) : false;
  }

  protected getPortXY(attributes: ParsedStarStyleProps, style: NodePortStyleProps): Point {
    const { position = 'top' } = style;
    const bbox = this.getKey().getLocalBounds();
    const ports = getStarPorts(this.getOuterR(attributes), this.getInnerR(attributes));
    return getPortPosition(bbox, position as StarPortPosition, ports, false);
  }
}
