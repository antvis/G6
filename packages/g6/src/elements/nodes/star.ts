import type { DisplayObjectConfig } from '@antv/g';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point, StarPortPlacement } from '../../types';
import { getPortXYByPlacement, getStarPoints, getStarPorts } from '../../utils/element';
import type { IconStyleProps } from '../shapes';
import { NodePortStyleProps } from './base-node';
import type { PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

export type StarStyleProps = PolygonStyleProps<{
  /**
   * <zh/> 内半径
   * <en/> Inner radius
   */
  innerR?: number;
}>;

export class Star extends Polygon<StarStyleProps> {
  constructor(options: DisplayObjectConfig<StarStyleProps>) {
    super(options);
  }

  private getInnerR(attributes: Required<StarStyleProps>): number {
    return attributes.innerR || (this.getOuterR(attributes) * 3) / 8;
  }

  private getOuterR(attributes: Required<StarStyleProps>): number {
    return Math.min(...this.getSize(attributes)) / 2;
  }

  protected getPoints(attributes: Required<StarStyleProps>): Point[] {
    return getStarPoints(this.getOuterR(attributes), this.getInnerR(attributes));
  }

  protected getIconStyle(attributes: Required<StarStyleProps>): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const size = this.getInnerR(attributes) * 2 * ICON_SIZE_RATIO;
    return style ? ({ width: size, height: size, ...style } as IconStyleProps) : false;
  }

  protected getPortXY(attributes: Required<StarStyleProps>, style: NodePortStyleProps): Point {
    const { placement = 'top' } = style;
    const bbox = this.getKey().getLocalBounds();
    const ports = getStarPorts(this.getOuterR(attributes), this.getInnerR(attributes));
    return getPortXYByPlacement(bbox, placement as StarPortPlacement, ports, false);
  }
}
