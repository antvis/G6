import type { DisplayObjectConfig } from '@antv/g';
import type { Point, StarPortPosition } from '../../types';
import { getPortPosition, getStarPoints, getStarPorts } from '../../utils/element';
import type { IconStyleProps } from '../shapes';
import { NodePortStyleProps } from './base-node';
import type { PolygonKeyStyleProps, PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

type StarKeyStyleProps = PolygonKeyStyleProps<{
  /**
   * <zh/> 内半径
   * <en/> Inner radius
   */
  innerR?: number;
}>;
export type StarStyleProps = PolygonStyleProps<StarKeyStyleProps>;
type ParsedStarStyleProps = Required<StarStyleProps>;
type StarOptions = DisplayObjectConfig<StarStyleProps>;

export class Star extends Polygon<StarKeyStyleProps> {
  constructor(options: StarOptions) {
    super(options);
  }

  private getInnerR(attributes: ParsedStarStyleProps): number {
    return attributes.innerR || (this.getOuterR(attributes) * 3) / 8;
  }

  private getOuterR(attributes: ParsedStarStyleProps): number {
    return Math.min(attributes.width, attributes.height) / 2;
  }

  protected getPoints(attributes: ParsedStarStyleProps): Point[] {
    return getStarPoints(this.getOuterR(attributes), this.getInnerR(attributes));
  }

  protected getIconStyle(attributes: ParsedStarStyleProps): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const size = this.getInnerR(attributes) * 2 * 0.8;
    return style ? ({ width: size, height: size, ...style } as IconStyleProps) : false;
  }

  protected getPortXY(attributes: ParsedStarStyleProps, style: NodePortStyleProps): Point {
    const { position = 'top' } = style;
    const bbox = this.getKey().getLocalBounds();
    const ports = getStarPorts(this.getOuterR(attributes), this.getInnerR(attributes));
    return getPortPosition(bbox, position as StarPortPosition, ports, false);
  }
}
