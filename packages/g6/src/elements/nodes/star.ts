import type { DisplayObjectConfig, Group, PolygonStyleProps } from '@antv/g';
import { Polygon } from '@antv/g';
import type { Point } from '../../types';
import { getStarAnchorByPosition, getStarAnchors, getStarPoints } from '../../utils/element';
import { getPolygonIntersectPoint } from '../../utils/point';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps, NodeAnchorStyleProps } from './base-node';
import { BaseNode } from './base-node';

type KeyShapeStyleProps = Partial<PolygonStyleProps> & {
  /**
   * 外半径
   */
  outerR?: number;
  /**
   * 内半径
   */
  innerR?: number;
};

export type StarStyleProps = BaseNodeStyleProps<KeyShapeStyleProps>;

type ParsedStarStyleProps = Required<StarStyleProps>;

type StarOptions = DisplayObjectConfig<StarStyleProps>;

/**
 * Draw star based on BaseNode, override drawKeyShape.
 */
export class Star extends BaseNode<KeyShapeStyleProps, Polygon> {
  constructor(options: StarOptions) {
    super(options);
  }

  protected getKeyStyle(attributes: ParsedStarStyleProps): PolygonStyleProps {
    const { outerR, innerR, ...keyStyle } = super.getKeyStyle(attributes) as Required<KeyShapeStyleProps>;
    const points = getStarPoints(outerR, innerR) as [number, number][];
    return { ...keyStyle, points };
  }

  protected getHaloStyle(attributes: ParsedStarStyleProps): PolygonStyleProps | false {
    if (attributes.halo === false) return false;

    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo');
    const keyStyle = this.getKeyStyle(attributes);

    return {
      ...keyStyle,
      ...haloStyle,
    };
  }

  protected getAnchorsStyle(attributes: ParsedStarStyleProps): NodeAnchorStyleProps[] {
    if (attributes.anchor === false) return [];

    const { outerR, innerR } = attributes;
    const anchors = getStarAnchors(outerR, innerR);

    const anchorStyle = this.getGraphicStyle(attributes).anchorOptions || [];

    return anchorStyle.map((anchorStyle) => {
      const { position, ...style } = anchorStyle;
      const [cx, cy] = getStarAnchorByPosition(position as any, anchors);
      return { cx, cy, ...style } as NodeAnchorStyleProps;
    });
  }

  public getIntersectPoint(point: Point): Point {
    const { points } = this.getKeyStyle(this.attributes as ParsedStarStyleProps);
    const center = [this.attributes.x, this.attributes.y] as Point;
    return getPolygonIntersectPoint(point, center, points);
  }

  protected drawKeyShape(attributes: ParsedStarStyleProps, container: Group): Polygon {
    return this.upsert('key', Polygon, this.getKeyStyle(attributes), container) as Polygon;
  }

  connectedCallback() {}
}
