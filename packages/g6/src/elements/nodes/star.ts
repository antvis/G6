import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps } from '@antv/g';
import type { Point, StarAnchorPosition } from '../../types';
import { getStarAnchorByPosition, getStarAnchors, getStarPoints } from '../../utils/element';
import type { NodeAnchorStyleProps } from './base-node';
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

  protected getAnchorStyle(attributes: ParsedStarStyleProps, style: NodeAnchorStyleProps): GCircleStyleProps {
    const { position, width = 8, height = 8, ...restStyle } = style;
    const anchors = getStarAnchors(this.getOuterR(attributes), attributes.innerR);
    const [cx, cy] = getStarAnchorByPosition(position as StarAnchorPosition, anchors);
    const r = Math.min(width, height) / 2;
    return { cx, cy, r, ...restStyle };
  }
}
