import type { DisplayObjectConfig } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point, TrianglePortPlacement } from '../../types';
import { getIncircleRadius, getTriangleCenter } from '../../utils/bbox';
import { getPortPosition, getTrianglePoints, getTrianglePorts } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import { IconStyleProps } from '../shapes';
import type { NodePortStyleProps } from './base-node';
import type { ParsedPolygonStyleProps, PolygonStyleProps } from './polygon';
import { Polygon } from './polygon';

export type TriangleStyleProps = PolygonStyleProps & ExtendsStyleProps;
type ParsedTriangleStyleProps = ParsedPolygonStyleProps & Required<ExtendsStyleProps>;
type ExtendsStyleProps = {
  /**
   * <zh/> 三角形的方向
   * <en/> The direction of the triangle
   */
  direction?: TriangleDirection;
};
export type TriangleDirection = 'up' | 'left' | 'right' | 'down';

export class Triangle extends Polygon {
  static defaultStyleProps: Partial<TriangleStyleProps> = {
    size: 40,
    direction: 'up',
  };

  constructor(options: DisplayObjectConfig<TriangleStyleProps>) {
    super(deepMix({}, { style: Triangle.defaultStyleProps }, options));
  }

  protected getPoints(attributes: ParsedTriangleStyleProps): Point[] {
    const { direction } = attributes;
    const [width, height] = this.getSize(attributes);
    return getTrianglePoints(width, height, direction);
  }

  protected getPortXY(attributes: ParsedTriangleStyleProps, style: NodePortStyleProps): Point {
    const { direction } = attributes;
    const { placement = 'top' } = style;
    const bbox = this.getKey().getLocalBounds();
    const [width, height] = this.getSize(attributes);
    const ports = getTrianglePorts(width, height, direction);
    return getPortPosition(bbox, placement as TrianglePortPlacement, ports, false);
  }

  // icon 处于内切三角形的重心
  // icon is at the centroid of the triangle
  protected getIconStyle(attributes: ParsedTriangleStyleProps): false | IconStyleProps {
    const { icon, iconText, iconSrc, direction } = attributes;

    if (icon === false || isEmpty(iconText || iconSrc)) return false;

    const iconStyle = subStyleProps<IconStyleProps>(this.getGraphicStyle(attributes), 'icon');
    const bbox = this.getKey().getLocalBounds();
    const [x, y] = getTriangleCenter(bbox, direction);
    const size = getIncircleRadius(bbox, direction) * 2 * ICON_SIZE_RATIO;

    return {
      x,
      y,
      width: size,
      height: size,
      ...iconStyle,
    };
  }
}
