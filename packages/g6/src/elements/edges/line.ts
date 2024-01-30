import type { DisplayObjectConfig, LineStyleProps as GLineStyleProps, Group } from '@antv/g';
import { Line as GLine } from '@antv/g';
import { Point } from '@antv/util';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

export type LineStyleProps = BaseEdgeStyleProps<Omit<GLineStyleProps, 'x1' | 'y1' | 'x2' | 'y2'>>;

type LineOptions = DisplayObjectConfig<LineStyleProps>;

/**
 * Draw line based on BaseEdge, override drawKeyShape
 */
export class Line extends BaseEdge<LineStyleProps, GLine> {
  constructor(options: LineOptions) {
    super(options);
  }

  protected drawKeyShape(attributes: LineStyleProps, container: Group): GLine | undefined {
    return this.upsert('key', GLine, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: LineStyleProps): GLineStyleProps {
    const { sourcePoint, targetPoint, ...keyShape } = super.getKeyStyle(attributes) as GLineStyleProps & {
      sourcePoint: Point;
      targetPoint: Point;
    };
    return { ...keyShape, x1: sourcePoint.x, y1: sourcePoint.y, x2: targetPoint.x, y2: targetPoint.y };
  }
}
