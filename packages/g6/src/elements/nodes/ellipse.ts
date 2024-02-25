import type { DisplayObjectConfig, EllipseStyleProps as GEllipseStyleProps, Group } from '@antv/g';
import { Ellipse as GEllipse } from '@antv/g';
import { deepMix } from '@antv/util';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point } from '../../types';
import { getEllipseIntersectPoint } from '../../utils/point';
import type { IconStyleProps } from '../shapes';
import type { BaseNodeStyleProps, ParsedBaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type EllipseStyleProps = BaseNodeStyleProps<KeyStyleProps>;
type ParsedEllipseStyleProps = ParsedBaseNodeStyleProps<KeyStyleProps>;
type KeyStyleProps = GEllipseStyleProps;

export class Ellipse extends BaseNode<GEllipse, KeyStyleProps> {
  static defaultStyleProps: Partial<EllipseStyleProps> = {
    size: [80, 40],
  };

  constructor(options: DisplayObjectConfig<EllipseStyleProps>) {
    super(deepMix({}, { style: Ellipse.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: ParsedEllipseStyleProps, container: Group) {
    return this.upsert('key', GEllipse, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedEllipseStyleProps): KeyStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    const [majorAxis, minorAxis] = this.getSize(attributes);
    return {
      ...keyStyle,
      rx: majorAxis / 2,
      ry: minorAxis / 2,
    };
  }

  protected getIconStyle(attributes: ParsedEllipseStyleProps): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const { rx, ry } = this.getKeyStyle(attributes);
    const size = Math.min(rx as number, ry as number) * 2 * ICON_SIZE_RATIO;

    return style ? ({ width: size, height: size, ...style } as IconStyleProps) : false;
  }

  public getIntersectPoint(point: Point): Point {
    const keyShapeBounds = this.getKey().getBounds();
    return getEllipseIntersectPoint(point, keyShapeBounds);
  }
}
