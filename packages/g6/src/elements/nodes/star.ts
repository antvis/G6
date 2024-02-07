import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps } from '@antv/g';
import type { Point, StarPortPosition } from '../../types';
import { getStarPoints, getStarPortByPosition, getStarPorts } from '../../utils/element';
import type { NodePortStyleProps } from './base-node';
import type { PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

type StarKeyStyleProps = {
  /**
   * <zh/> 内半径
   * <en/> Inner radius
   */
  innerR?: number;
};
export type StarStyleProps = PolygonStyleProps<StarKeyStyleProps>;
type ParsedStarStyleProps = Required<StarStyleProps>;
type StarOptions = DisplayObjectConfig<StarStyleProps>;

export class Star extends Polygon<StarKeyStyleProps> {
  constructor(options: StarOptions) {
    super(options);
  }

  private getOuterR(attributes: ParsedStarStyleProps): number {
    return Math.min(attributes.width, attributes.height) / 2;
  }

  protected getPoints(attributes: ParsedStarStyleProps): Point[] {
    return getStarPoints(this.getOuterR(attributes), attributes.innerR);
  }

  protected getPortStyle(attributes: ParsedStarStyleProps, style: NodePortStyleProps): GCircleStyleProps {
    const { position, width = 8, height = 8, ...restStyle } = style;
    const ports = getStarPorts(this.getOuterR(attributes), attributes.innerR);
    const [cx, cy] = getStarPortByPosition(position as StarPortPosition, ports);
    const r = Math.min(width, height) / 2;
    return { cx, cy, r, ...restStyle };
  }
}
