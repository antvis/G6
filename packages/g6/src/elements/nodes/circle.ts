import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { deepMix } from '@antv/util';
import type { BaseNodeProps, Point } from '../../types';
import { getEllipseIntersectPoint } from '../../utils/point';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type CircleStyleProps = BaseNodeStyleProps<BaseNodeProps>;
type ParsedCircleStyleProps = Required<CircleStyleProps>;
type CircleOptions = DisplayObjectConfig<CircleStyleProps>;

/**
 * Draw circle based on BaseNode, override drawKeyShape.
 */
export class Circle extends BaseNode<BaseNodeProps, GCircle> {
  static defaultStyleProps: Partial<CircleStyleProps> = {
    width: 50,
    height: 50,
  };

  constructor(options: CircleOptions) {
    super(deepMix({}, { style: Circle.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: ParsedCircleStyleProps, container: Group): GCircle | undefined {
    return this.upsert('key', GCircle, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedCircleStyleProps): GCircleStyleProps {
    const { x, y, width, height, ...keyStyle } = super.getKeyStyle(attributes) as unknown as ParsedCircleStyleProps;
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
