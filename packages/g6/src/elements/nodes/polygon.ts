import type { DisplayObjectConfig, PolygonStyleProps as GPolygonStyleProps, Group } from '@antv/g';
import { Polygon as GPolygon } from '@antv/g';
import type { Point } from '../../types';
import { getPolygonIntersectPoint } from '../../utils/point';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type PolygonKeyStyleProps<KT> = Partial<GPolygonStyleProps> & KT;
export type PolygonStyleProps<KT> = BaseNodeStyleProps<PolygonKeyStyleProps<KT>>;
type ParsedPolygonStyleProps<KT> = Required<PolygonStyleProps<KT>>;
type PolygonOptions<KT> = DisplayObjectConfig<PolygonStyleProps<KT>>;

/**
 * Abstract class for polygon nodes,i.e triangle, diamond, hexagon, etc.
 */
export abstract class Polygon<KT> extends BaseNode<PolygonKeyStyleProps<KT>, GPolygon> {
  constructor(options: PolygonOptions<KT>) {
    super(options);
  }

  protected drawKeyShape(attributes: ParsedPolygonStyleProps<KT>, container: Group): GPolygon {
    return this.upsert('key', GPolygon, this.getKeyStyle(attributes) as GPolygonStyleProps, container) as GPolygon;
  }

  protected getKeyStyle(attributes: ParsedPolygonStyleProps<KT>): PolygonKeyStyleProps<KT> {
    const { width, height, ...keyStyle } = super.getKeyStyle(attributes);
    return { ...keyStyle, points: this.getPoints(attributes) } as PolygonKeyStyleProps<KT>;
  }

  protected abstract getPoints(attributes: ParsedPolygonStyleProps<KT>): Point[];

  public getIntersectPoint(point: Point): Point {
    const { points } = this.getKeyStyle(this.attributes as ParsedPolygonStyleProps<KT>);
    const center = [this.attributes.x, this.attributes.y] as Point;
    return getPolygonIntersectPoint(point, center, points!);
  }
}
