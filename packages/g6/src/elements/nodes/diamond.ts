import type { DisplayObjectConfig } from '@antv/g';
import type { Point } from '../../types';
import { getDiamondPoints } from '../../utils/element';
import { getPolygonIntersectPoint } from '../../utils/point';
import type { ParsedPolygonStyleProps, PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

type ExtendsStyleProps = {
  width?: number;
  height?: number;
};
export type DiamondStyleProps = PolygonStyleProps & ExtendsStyleProps;

type ParsedDiamondStyleProps = ParsedPolygonStyleProps & Required<ExtendsStyleProps>;

/**
 * Draw diamond based on BaseNode, override drawKeyShape.
 */
export class Diamond extends Polygon {
  constructor(options: DisplayObjectConfig<DiamondStyleProps>) {
    super(options);
  }
  private defaultWidth: number = 40;
  private defaultHeight: number = 40;
  private getWidth(attributes: ParsedDiamondStyleProps): number {
    return attributes.width || this.defaultWidth;
  }
  private getHeight(attributes: ParsedDiamondStyleProps): number {
    return attributes.height || this.defaultHeight;
  }
  protected getPoints(attributes: ParsedDiamondStyleProps): Point[] {
    return getDiamondPoints(this.getWidth(attributes), this.getHeight(attributes));
  }

  public getIntersectPoint(point: Point): Point {
    const { points } = this.getKeyStyle(this.attributes as ParsedDiamondStyleProps);
    const center = [this.attributes.x, this.attributes.y] as Point;
    return getPolygonIntersectPoint(point, center, points);
  }

  connectedCallback() {}
}
