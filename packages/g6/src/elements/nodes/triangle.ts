import type { DisplayObjectConfig } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { Point, TrianglePortPosition } from '../../types';
import { getIncircleRadius, getTriangleCenter } from '../../utils/bbox';
import { getPortPosition, getTrianglePoints, getTrianglePorts } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import { IconStyleProps } from '../shapes';
import type { BaseNodeStyleProps, NodePortStyleProps } from './base-node';
import type { PolygonKeyStyleProps } from './polygon';
import { Polygon } from './polygon';

export type TriangleDirection = 'up' | 'left' | 'right' | 'down';
type TriangleKeyShapeStyleProps = PolygonKeyStyleProps<{
  /**
   * <zh/> 三角形的方向
   * <en/> The direction of the triangle
   */
  direction?: TriangleDirection;
}>;
export type TriangleStyleProps = BaseNodeStyleProps<TriangleKeyShapeStyleProps>;
type ParsedTriangleStyleProps = Required<TriangleStyleProps>;
type TriangleOptions = DisplayObjectConfig<TriangleStyleProps>;

export class Triangle extends Polygon<TriangleKeyShapeStyleProps> {
  static defaultStyleProps: Partial<TriangleKeyShapeStyleProps> = {
    width: 40,
    height: 40,
    direction: 'up',
  };

  constructor(options: TriangleOptions) {
    super(deepMix({}, { style: Triangle.defaultStyleProps }, options));
  }

  protected getPoints(attributes: ParsedTriangleStyleProps): Point[] {
    const { width, height, direction } = attributes;
    return getTrianglePoints(width, height, direction);
  }

  protected getPortXY(attributes: ParsedTriangleStyleProps, style: NodePortStyleProps): Point {
    const { width, height, direction } = attributes;
    const { position = 'top' } = style;
    const bbox = this.getKey().getLocalBounds();
    const ports = getTrianglePorts(width, height, direction);
    return getPortPosition(bbox, position as TrianglePortPosition, ports, false);
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
