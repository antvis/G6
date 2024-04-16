import type { DisplayObjectConfig } from '@antv/g';
import type { Point } from '../../types';
import { getDiamondPoints } from '../../utils/element';
import { getPolygonIntersectPoint } from '../../utils/point';
import type { PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

export type DiamondStyleProps = PolygonStyleProps;

/**
 * Draw diamond based on BaseNode, override drawKeyShape.
 */
export class Diamond extends Polygon {
  constructor(options: DisplayObjectConfig<DiamondStyleProps>) {
    super(options);
  }

  protected getPoints(attributes: Required<DiamondStyleProps>): Point[] {
    const [width, height] = this.getSize(attributes);
    return getDiamondPoints(width, height);
  }

  public getIntersectPoint(point: Point): Point {
    const { points } = this.getKeyStyle(this.parsedAttributes);
    const center = [this.attributes.x, this.attributes.y] as Point;
    return getPolygonIntersectPoint(point, center, points).point;
  }
}
