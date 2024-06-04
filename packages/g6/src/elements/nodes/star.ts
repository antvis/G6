import type { DisplayObjectConfig } from '@antv/g';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { NodePortStyleProps, Point, StarPortPlacement } from '../../types';
import { getPortXYByPlacement, getStarPoints, getStarPorts } from '../../utils/element';
import type { IconStyleProps, PolygonStyleProps } from '../shapes';
import { Polygon } from '../shapes/polygon';

/**
 * <zh/> 五角星节点样式配置项
 *
 * <en/> Star node style props
 */
export interface StarStyleProps extends PolygonStyleProps {
  /**
   * <zh/> 内半径，默认为外半径的 3/8
   *
   * <en/> Inner radius, default is 3/8 of the outer radius
   */
  innerR?: number;
}

/**
 * <zh/> 五角星节点
 *
 * <en/> Star node
 */
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
    const bbox = this.getShape('key').getLocalBounds();
    const ports = getStarPorts(this.getOuterR(attributes), this.getInnerR(attributes));
    return getPortXYByPlacement(bbox, placement as StarPortPlacement, ports, false);
  }
}
