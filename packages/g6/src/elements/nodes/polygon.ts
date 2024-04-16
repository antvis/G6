import type { DisplayObjectConfig, PolygonStyleProps as GPolygonStyleProps, Group } from '@antv/g';
import { Polygon as GPolygon } from '@antv/g';
import type { Point } from '../../types';
import { getPolygonIntersectPoint } from '../../utils/point';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type PolygonStyleProps<T extends Record<string, unknown> = Record<string, any>> = BaseNodeStyleProps<
  T & {
    points: ([number, number] | [number, number, number])[];
  }
>;

/**
 * Abstract class for polygon nodes,i.e triangle, diamond, hexagon, etc.
 */
export abstract class Polygon<T extends PolygonStyleProps = PolygonStyleProps> extends BaseNode<T> {
  constructor(options: DisplayObjectConfig<PolygonStyleProps<T>>) {
    super(options);
  }

  public get parsedAttributes() {
    return this.attributes as unknown as Required<PolygonStyleProps<T>>;
  }

  protected drawKeyShape(attributes: Required<PolygonStyleProps<T>>, container: Group) {
    return this.upsert('key', GPolygon, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: Required<PolygonStyleProps<T>>): GPolygonStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    return { ...keyStyle, points: this.getPoints(attributes) };
  }

  protected abstract getPoints(attributes: Required<PolygonStyleProps<T>>): Point[];

  public getIntersectPoint(point: Point): Point {
    const { points } = this.getKeyStyle(this.parsedAttributes as Required<PolygonStyleProps<T>>);
    const center: Point = [+(this.attributes?.x || 0), +(this.attributes?.y || 0)];
    return getPolygonIntersectPoint(point, center, points!).point;
  }
}
