import type { DisplayObjectConfig, PolygonStyleProps as GPolygonStyleProps, Group } from '@antv/g';
import { Polygon as GPolygon } from '@antv/g';
import type { Point } from '../../types';
import { getPolygonIntersectPoint } from '../../utils/point';
import type { BaseNodeStyleProps } from '../nodes/base-node';
import { BaseNode } from '../nodes/base-node';

/**
 * <zh/> 多边形节点样式配置项
 *
 * <en/> Polygon node style props
 */
export interface PolygonStyleProps extends BaseNodeStyleProps {
  /**
   * <zh/> 多边形的顶点坐标
   *
   * <en/> The vertex coordinates of the polygon
   * @internal
   */
  points?: ([number, number] | [number, number, number])[];
}

/**
 * Abstract class for polygon nodes,i.e triangle, diamond, hexagon, etc.
 */
export abstract class Polygon<T extends PolygonStyleProps = PolygonStyleProps> extends BaseNode<T> {
  constructor(options: DisplayObjectConfig<T>) {
    super(options);
  }

  public get parsedAttributes() {
    return this.attributes as unknown as Required<T>;
  }

  protected drawKeyShape(attributes: Required<T>, container: Group) {
    return this.upsert('key', GPolygon, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: Required<T>): GPolygonStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    return { ...keyStyle, points: this.getPoints(attributes) };
  }

  protected abstract getPoints(attributes: Required<T>): Point[];

  public getIntersectPoint(point: Point, useExtendedLine = false): Point {
    const { points } = this.getShape<GPolygon>('key').attributes;
    const center: Point = [+(this.attributes?.x || 0), +(this.attributes?.y || 0)];
    return getPolygonIntersectPoint(point, center, points!, true, useExtendedLine).point;
  }
}
