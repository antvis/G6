import type { DisplayObjectConfig, LineStyleProps as GLineStyleProps, Group } from '@antv/g';
import { Line as GLine } from '@antv/g';
import { Point, deepMix } from '@antv/util';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

export type LineStyleProps = BaseEdgeStyleProps & GLineStyleProps;

type ParsedLineStyleProps = Required<LineStyleProps>;

type LineOptions = DisplayObjectConfig<ParsedLineStyleProps>;

export class Line extends BaseEdge<LineStyleProps> {
  static defaultStyleProps: Partial<LineStyleProps> = {};

  constructor(options: LineOptions) {
    super(deepMix({}, { style: Line.defaultStyleProps }, options));
  }

  public drawKey(attributes: ParsedLineStyleProps, container: Group): GLine | undefined {
    return this.upsert('line', GLine, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedLineStyleProps): GLineStyleProps {
    const { sourcePoint, targetPoint, ...keyShape } = super.getKeyStyle(attributes) as GLineStyleProps & {
      sourcePoint: Point;
      targetPoint: Point;
    };
    return { ...keyShape, x1: sourcePoint.x, y1: sourcePoint.y, x2: targetPoint.x, y2: targetPoint.y };
  }
}
