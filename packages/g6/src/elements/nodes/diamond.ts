import type { DisplayObjectConfig, Group, PolygonStyleProps } from '@antv/g';
import { Polygon } from '@antv/g';
import type { Point } from '../../types';
import { getDiamondPoints } from '../../utils/element';
import { getPolygonIntersectPoint } from '../../utils/point';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type KeyShapeStyleProps = Partial<PolygonStyleProps> & {
  width?: number;
  height?: number;
};

export type DiamondStyleProps = BaseNodeStyleProps<KeyShapeStyleProps>;

type ParsedDiamondStyleProps = Required<DiamondStyleProps>;

type DiamondOptions = DisplayObjectConfig<DiamondStyleProps>;

/**
 * Draw diamond based on BaseNode, override drawKeyShape.
 */
export class Diamond extends BaseNode<KeyShapeStyleProps, Polygon> {
  constructor(options: DiamondOptions) {
    super(options);
  }

  protected getKeyStyle(attributes: ParsedDiamondStyleProps): PolygonStyleProps {
    const { width, height, ...keyStyle } = super.getKeyStyle(attributes) as Required<KeyShapeStyleProps>;
    const points = getDiamondPoints(width, height) as [number, number][];
    return { ...keyStyle, points };
  }

  protected getHaloStyle(attributes: ParsedDiamondStyleProps): PolygonStyleProps | false {
    if (attributes.halo === false) return false;
    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo') as Partial<KeyShapeStyleProps>;
    const keyStyle = this.getKeyStyle(attributes);
    const lineWidth = Number(keyStyle.lineWidth || 0);
    const haloLineWidth = Number(haloStyle.lineWidth || 0);
    const { width = 0, height = 0 } = attributes;
    const points = getDiamondPoints(
      Number(width) + lineWidth + haloLineWidth + 4,
      Number(height) + lineWidth + haloLineWidth + 4,
    ) as [number, number][];

    return {
      ...keyStyle,
      points,
      ...haloStyle,
    };
  }

  public getIntersectPoint(point: Point): Point {
    const { points } = this.getKeyStyle(this.attributes as ParsedDiamondStyleProps);
    const center = [this.attributes.x, this.attributes.y] as Point;
    return getPolygonIntersectPoint(point, center, points);
  }

  protected drawKeyShape(attributes: ParsedDiamondStyleProps, container: Group): Polygon {
    return this.upsert('key', Polygon, this.getKeyStyle(attributes), container) as Polygon;
  }

  connectedCallback() {}
}
