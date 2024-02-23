import type { DisplayObjectConfig, PolygonStyleProps as GPolygonStyleProps, Group } from '@antv/g';
import { Polygon as GPolygon } from '@antv/g';
import type { BaseNodeProps, Point } from '../../types';
import { getPolygonIntersectPoint } from '../../utils/point';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type PolygonKeyStyleProps = BaseNodeProps & GPolygonStyleProps;
export type PolygonStyleProps<P extends PolygonKeyStyleProps> = BaseNodeStyleProps<P>;
type ParsedPolygonStyleProps<P extends PolygonKeyStyleProps> = Required<PolygonStyleProps<P>>;
type PolygonOptions<P extends PolygonKeyStyleProps> = DisplayObjectConfig<PolygonStyleProps<P>>;

/**
 * Abstract class for polygon nodes,i.e triangle, diamond, hexagon, etc.
 */
export abstract class Polygon<P extends PolygonKeyStyleProps> extends BaseNode<P, GPolygon> {
  constructor(options: PolygonOptions<P>) {
    super(options);
  }

  protected drawKeyShape(attributes: ParsedPolygonStyleProps<P>, container: Group): GPolygon | undefined {
    return this.upsert('key', GPolygon, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedPolygonStyleProps<P>): P {
    const { width, height, ...keyStyle } = super.getKeyStyle(attributes);
    return { ...keyStyle, points: this.getPoints(attributes) as [number, number][] } as P;
  }

  protected abstract getPoints(attributes: ParsedPolygonStyleProps<P>): Point[];

  public getIntersectPoint(point: Point): Point {
    const { points } = this.getKeyStyle(this.attributes as any);
    const center = [this.attributes.x, this.attributes.y] as Point;
    return getPolygonIntersectPoint(point, center, points!);
  }
}
