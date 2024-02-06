import type { DisplayObjectConfig, Group, PolygonStyleProps } from '@antv/g';
import { Polygon } from '@antv/g';
import type { Point } from '../../types';
import { getRectPoints } from '../../utils/element';
import { getPolygonIntersectPoint } from '../../utils/point';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type KeyShapeStyleProps = Partial<PolygonStyleProps> & {
  width?: number;
  height?: number;
};

export type RectStyleProps = BaseNodeStyleProps<KeyShapeStyleProps>;

type ParsedRectStyleProps = Required<RectStyleProps>;

type RectOptions = DisplayObjectConfig<RectStyleProps>;

/**
 * Draw Rect based on BaseNode, override drawKeyShape.
 */
export class Rect extends BaseNode<KeyShapeStyleProps, Polygon> {
  constructor(options: RectOptions) {
    super(options);
  }

  protected getKeyStyle(attributes: ParsedRectStyleProps): PolygonStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    const { width = 20, height = width } = keyStyle;
    const points = getRectPoints(width, height) as [number, number][];
    return { ...keyStyle, points };
  }

  protected getHaloStyle(attributes: ParsedRectStyleProps): KeyShapeStyleProps | false {
    if (attributes.halo === false) return false;

    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo') as Partial<KeyShapeStyleProps>;
    const keyStyle = this.getKeyStyle(attributes);
    const lineWidth = Number(haloStyle.lineWidth);
    const { width = 20, height = width } = attributes;
    const points = getRectPoints(Number(width) + lineWidth / 2, Number(height) + lineWidth / 2);

    return {
      ...keyStyle,
      points,
      ...haloStyle,
    } as KeyShapeStyleProps;
  }

  public getIntersectPoint(point: Point): Point {
    const { points } = this.getKeyStyle(this.attributes as ParsedRectStyleProps);
    const center = [this.attributes.x, this.attributes.y] as Point;
    return getPolygonIntersectPoint(point, center, points);
  }

  protected drawKeyShape(attributes: ParsedRectStyleProps, container: Group): Polygon {
    return this.upsert('key', Polygon, this.getKeyStyle(attributes), container) as Polygon;
  }
}
