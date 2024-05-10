import type { DisplayObjectConfig } from '@antv/g';
import type { Point } from '../../types';
import { getDiamondPoints } from '../../utils/element';
import { getPolygonIntersectPoint } from '../../utils/point';
import type { PolygonStyleProps } from '../shapes';
import { Polygon } from '../shapes/polygon';

/**
 * <zh/> 菱形节点样式配置项
 *
 * <en/> Diamond node style props
 */
export interface DiamondStyleProps extends PolygonStyleProps {}

/**
 * <zh/> 菱形节点
 *
 * <en/> Diamond node
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
