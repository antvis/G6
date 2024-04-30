import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { deepMix } from '@antv/util';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point } from '../../types';
import { getEllipseIntersectPoint } from '../../utils/point';
import type { IconStyleProps } from '../shapes';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

/**
 * <zh/> 圆形节点样式配置项
 *
 * <en/> Circle node style props
 */
export interface CircleStyleProps extends BaseNodeStyleProps {}

/**
 * <zh/> 圆形节点
 *
 * <en/> Circle node
 */
export class Circle extends BaseNode {
  static defaultStyleProps: Partial<CircleStyleProps> = {
    size: 24,
  };

  constructor(options: DisplayObjectConfig<CircleStyleProps>) {
    super(deepMix({}, { style: Circle.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: Required<CircleStyleProps>, container: Group) {
    return this.upsert('key', GCircle, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: Required<CircleStyleProps>): GCircleStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    return { ...keyStyle, r: Math.min(...this.getSize(attributes)) / 2 };
  }

  protected getIconStyle(attributes: Required<CircleStyleProps>): false | IconStyleProps {
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
