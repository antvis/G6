import type { DisplayObjectConfig } from '@antv/g';
import { isEmpty } from '@antv/util';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { NodePortStyleProps, Point, TriangleDirection, TrianglePortPlacement } from '../../types';
import { getIncircleRadius, getTriangleCenter } from '../../utils/bbox';
import { getPortXYByPlacement, getTrianglePoints, getTrianglePorts } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import { mergeOptions } from '../../utils/style';
import type { PolygonStyleProps } from '../shapes';
import { IconStyleProps } from '../shapes';
import { Polygon } from '../shapes/polygon';

/**
 * <zh/> 三角形节点样式配置项
 *
 * <en/> Triangle node style props
 */
export interface TriangleStyleProps extends PolygonStyleProps {
  /**
   * <zh/> 三角形的方向
   *
   * <en/> The direction of the triangle
   * @defaultValue 'up'
   */
  direction?: TriangleDirection;
}

/**
 * <zh/> 三角形节点
 *
 * <en/> Triangle node
 */
export class Triangle extends Polygon<TriangleStyleProps> {
  static defaultStyleProps: Partial<TriangleStyleProps> = {
    size: 40,
    direction: 'up',
  };

  constructor(options: DisplayObjectConfig<TriangleStyleProps>) {
    super(mergeOptions({ style: Triangle.defaultStyleProps }, options));
  }

  protected getPoints(attributes: Required<TriangleStyleProps>): Point[] {
    const { direction } = attributes;
    const [width, height] = this.getSize(attributes);
    return getTrianglePoints(width, height, direction);
  }

  protected getPortXY(attributes: Required<TriangleStyleProps>, style: NodePortStyleProps): Point {
    const { direction } = attributes;
    const { placement = 'top' } = style;
    const bbox = this.getShape('key').getLocalBounds();
    const [width, height] = this.getSize(attributes);
    const ports = getTrianglePorts(width, height, direction);
    return getPortXYByPlacement(bbox, placement as TrianglePortPlacement, ports, false);
  }

  // icon 处于内切三角形的重心
  // icon is at the centroid of the triangle
  protected getIconStyle(attributes: Required<TriangleStyleProps>): false | IconStyleProps {
    const { icon, iconText, iconSrc, direction } = attributes;

    if (icon === false || isEmpty(iconText || iconSrc)) return false;

    const iconStyle = subStyleProps<IconStyleProps>(this.getGraphicStyle(attributes), 'icon');
    const bbox = this.getShape('key').getLocalBounds();
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
