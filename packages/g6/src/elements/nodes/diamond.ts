import type { DisplayObjectConfig } from '@antv/g';
import type { Point } from '../../types';
import { getDiamondPoints } from '../../utils/element';
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
}
