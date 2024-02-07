import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import type { Point } from '../../types';
import { getEllipseIntersectPoint } from '../../utils/point';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type CircleKeyStyleProps = GCircleStyleProps;
export type CircleStyleProps = BaseNodeStyleProps<CircleKeyStyleProps>;
type ParsedCircleStyleProps = Required<CircleStyleProps>;
type CircleOptions = DisplayObjectConfig<Omit<CircleStyleProps, 'r'>>;

/**
 * Draw circle based on BaseNode, override drawKeyShape.
 */
export class Circle extends BaseNode<CircleKeyStyleProps, GCircle> {
  constructor(options: CircleOptions) {
    super(options as DisplayObjectConfig<CircleStyleProps>);
  }

  protected drawKeyShape(attributes: ParsedCircleStyleProps, container: Group): GCircle {
    return this.upsert('key', GCircle, this.getKeyStyle(attributes), container) as GCircle;
  }

  protected getKeyStyle(attributes: ParsedCircleStyleProps): CircleKeyStyleProps {
    const { x, y, width, height, ...keyStyle } = super.getKeyStyle(attributes) as Required<CircleStyleProps>;
    return {
      ...keyStyle,
      cx: x,
      cy: y,
      r: Math.min(width, height) / 2,
    };
  }

  public getIntersectPoint(point: Point): Point {
    const keyShapeBounds = this.getKey().getBounds();
    return getEllipseIntersectPoint(point, keyShapeBounds);
  }
}
