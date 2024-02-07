import type { DisplayObjectConfig, Group, PolygonStyleProps } from '@antv/g';
import { Polygon } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import type { Point } from '../../types';
import { getTrianglePoints } from '../../utils/element';
import { getPolygonIntersectPoint } from '../../utils/point';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type TriangleShapeStyleProps = {
  /**
   * 节点宽度
   */
  width?: number;
  /**
   * 节点高度
   */
  heigh?: number;
  /**
   * 三角形朝向
   */
  direction?: 'up' | 'left' | 'right' | 'down';
};

type KeyShapeStyleProps = Partial<PolygonStyleProps> & TriangleShapeStyleProps;

export type TriangleStyleProps = BaseNodeStyleProps<KeyShapeStyleProps>;

type ParsedTriangleStyleProps = Required<TriangleStyleProps>;

type TriangleOptions = DisplayObjectConfig<TriangleStyleProps>;

export class Triangle extends BaseNode<KeyShapeStyleProps, Polygon> {
  static defaultStyleProps: Partial<TriangleShapeStyleProps> = {
    direction: 'up',
  };
  constructor(options: TriangleOptions) {
    super(deepMix({}, { style: Triangle.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedTriangleStyleProps): PolygonStyleProps {
    const {
      width,
      heigh = width,
      direction,
      ...keyStyle
    } = super.getKeyStyle(attributes) as Required<KeyShapeStyleProps>;
    const r = Math.min(width, heigh) / 2;
    const points = getTrianglePoints(r, direction) as [number, number][];
    return { ...keyStyle, points };
  }

  protected getHaloStyle(attributes: ParsedTriangleStyleProps): PolygonStyleProps | false {
    if (attributes.halo === false) return false;

    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo') as Partial<KeyShapeStyleProps>;
    const keyStyle = this.getKeyStyle(attributes);

    return {
      ...keyStyle,
      ...haloStyle,
    };
  }

  protected getIconStyle(attributes: ParsedTriangleStyleProps) {
    if (attributes.icon === false || isEmpty(attributes.iconText || attributes.iconSrc)) return false;

    const { direction } = attributes;
    const iconStyle = subStyleProps(this.getGraphicStyle(attributes), 'icon');
    const keyShape = this.shapeMap.key;
    const { max, center } = keyShape.getLocalBounds();
    const x = direction === 'up' || direction === 'down' ? center[0] : direction === 'right' ? -max[0] / 4 : max[0] / 4;
    const y =
      direction === 'left' || direction === 'right' ? center[1] : direction === 'down' ? -max[1] / 4 : max[1] / 4;

    return {
      x,
      y,
      ...iconStyle,
    };
  }

  public getIntersectPoint(point: Point): Point {
    const { points } = this.getKeyStyle(this.attributes as ParsedTriangleStyleProps);
    const center = [this.attributes.x, this.attributes.y] as Point;
    return getPolygonIntersectPoint(point, center, points);
  }

  protected drawKeyShape(attributes: ParsedTriangleStyleProps, container: Group): Polygon {
    return this.upsert('key', Polygon, this.getKeyStyle(attributes), container) as Polygon;
  }
}
