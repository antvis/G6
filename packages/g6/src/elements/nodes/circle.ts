import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point } from '../../types';
import { getEllipseIntersectPoint } from '../../utils/point';
import { mergeOptions } from '../../utils/style';
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
    size: 32,
  };

  constructor(options: DisplayObjectConfig<CircleStyleProps>) {
    super(mergeOptions({ style: Circle.defaultStyleProps }, options));
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
    const { r } = this.getShape<GCircle>('key').attributes;
    const size = (r as number) * 2 * ICON_SIZE_RATIO;
    return style ? ({ width: size, height: size, ...style } as IconStyleProps) : false;
  }

  public getIntersectPoint(point: Point, useExtendedLine = false): Point {
    const keyShapeBounds = this.getShape('key').getBounds();
    return getEllipseIntersectPoint(point, keyShapeBounds, useExtendedLine);
  }
}
