import type { DisplayObjectConfig, EllipseStyleProps as GEllipseStyleProps, Group } from '@antv/g';
import { Ellipse as GEllipse } from '@antv/g';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point } from '../../types';
import { getEllipseIntersectPoint } from '../../utils/point';
import { mergeOptions } from '../../utils/style';
import type { IconStyleProps } from '../shapes';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

/**
 * <zh/> 椭圆节点样式配置项
 *
 * <en/> Ellipse node style props
 */
export interface EllipseStyleProps extends BaseNodeStyleProps {}

/**
 * <zh/> 椭圆节点
 *
 * <en/> Ellipse node
 */
export class Ellipse extends BaseNode {
  static defaultStyleProps: Partial<EllipseStyleProps> = {
    size: [45, 35],
  };

  constructor(options: DisplayObjectConfig<EllipseStyleProps>) {
    super(mergeOptions({ style: Ellipse.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: Required<EllipseStyleProps>, container: Group) {
    return this.upsert('key', GEllipse, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: Required<EllipseStyleProps>): GEllipseStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    const [majorAxis, minorAxis] = this.getSize(attributes);
    return {
      ...keyStyle,
      rx: majorAxis / 2,
      ry: minorAxis / 2,
    };
  }

  protected getIconStyle(attributes: Required<EllipseStyleProps>): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const { rx, ry } = this.getShape<GEllipse>('key').attributes;
    const size = Math.min(+rx, +ry) * 2 * ICON_SIZE_RATIO;

    return style ? ({ width: size, height: size, ...style } as IconStyleProps) : false;
  }

  public getIntersectPoint(point: Point, useExtendedLine = false): Point {
    const keyShapeBounds = this.getShape('key').getBounds();
    return getEllipseIntersectPoint(point, keyShapeBounds, useExtendedLine);
  }
}
