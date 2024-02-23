import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { deepMix } from '@antv/util';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { BaseNodeProps, Point } from '../../types';
import { getEllipseIntersectPoint } from '../../utils/point';
import type { IconStyleProps } from '../shapes';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type CircleKeyStyleProps = BaseNodeProps & GCircleStyleProps;
export type CircleStyleProps = BaseNodeStyleProps<CircleKeyStyleProps>;
type ParsedCircleStyleProps = Required<CircleStyleProps>;
type CircleOptions = DisplayObjectConfig<CircleStyleProps>;

/**
 * Draw circle based on BaseNode, override drawKeyShape.
 */
export class Circle extends BaseNode<CircleKeyStyleProps, GCircle> {
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

  protected getKeyStyle(attributes: ParsedCircleStyleProps): CircleKeyStyleProps {
    const { x, y, z, width, height, ...keyStyle } = super.getKeyStyle(attributes);
    return {
      ...keyStyle,
      cx: x,
      cy: y,
      cz: z,
      r: Math.min(width as number, height as number) / 2,
    };
  }

  protected getIconStyle(attributes: ParsedCircleStyleProps): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const { r } = this.getKeyStyle(attributes);
    const size = (r as number) * 2 * ICON_SIZE_RATIO;
    return style ? ({ width: size, height: size, ...style } as IconStyleProps) : false;
  }

  public getIntersectPoint(point: Point): Point {
    const keyShapeBounds = this.getKey().getBounds();
    return getEllipseIntersectPoint(point, keyShapeBounds);
  }
}
