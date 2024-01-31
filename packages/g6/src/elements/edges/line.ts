import type { DisplayObjectConfig, LineStyleProps as GLineStyleProps, Group } from '@antv/g';
import { Line as GLine } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Point } from '../../types';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

type LineKeyStyleProps = Partial<GLineStyleProps> & {
  /**
   * <zh/> 边的起点
   * <en/> The source point. Represents the start of the edge
   */
  sourcePoint: Point;
  /**
   * <zh/> 边的终点
   * <en/> The target point. Represents the end of the edge
   */
  targetPoint: Point;
};

export type LineStyleProps = BaseEdgeStyleProps<LineKeyStyleProps>;

type ParsedLineStyleProps = Required<LineStyleProps>;

type LineOptions = DisplayObjectConfig<LineStyleProps>;

/**
 * Draw line based on BaseEdge, override drawKeyShape
 */
export class Line extends BaseEdge<GLineStyleProps, GLine> {
  static defaultStyleProps: Partial<LineStyleProps> = {};

  constructor(options: LineOptions) {
    super(deepMix({}, { style: Line.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: ParsedLineStyleProps, container: Group): GLine | undefined {
    return this.upsert('key', GLine, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedLineStyleProps): GLineStyleProps {
    const { sourcePoint, targetPoint, ...keyShape } = super.getKeyStyle(attributes) as LineKeyStyleProps;

    return { ...keyShape, x1: sourcePoint[0], y1: sourcePoint[1], x2: targetPoint[0], y2: targetPoint[1] };
  }
}
