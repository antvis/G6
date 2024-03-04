import type { DisplayObjectConfig, PolygonStyleProps as GPolygonStyleProps, Group } from '@antv/g';
import { Polygon as GPolygon } from '@antv/g';
import type { Point } from '../../types';
import { getPolygonIntersectPoint } from '../../utils/point';
import type { BaseNodeStyleProps, ParsedBaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type PolygonStyleProps = BaseNodeStyleProps<PolygonKeyStyleProps>;
export type ParsedPolygonStyleProps = ParsedBaseNodeStyleProps<PolygonKeyStyleProps>;
export type PolygonKeyStyleProps = GPolygonStyleProps;

/**
 * Abstract class for polygon nodes,i.e triangle, diamond, hexagon, etc.
 */
export abstract class Polygon extends BaseNode<GPolygon, PolygonKeyStyleProps> {
  constructor(options: DisplayObjectConfig<PolygonStyleProps>) {
    super(options);
  }

  protected drawKeyShape(attributes: ParsedPolygonStyleProps, container: Group) {
    return this.upsert('key', GPolygon, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedPolygonStyleProps): PolygonKeyStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    return { ...keyStyle, points: this.getPoints(attributes) } as PolygonKeyStyleProps;
  }

  protected abstract getPoints(attributes: ParsedPolygonStyleProps): Point[];

  public getIntersectPoint(point: Point): Point {
    const { points } = this.getKeyStyle(this.parsedAttributes as ParsedPolygonStyleProps);
    const center: Point = [+(this.attributes?.x || 0), +(this.attributes?.y || 0)];
    return getPolygonIntersectPoint(point, center, points!);
  }
}
