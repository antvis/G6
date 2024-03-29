import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';
import { deepMix } from '@antv/util';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

export type LineStyleProps = BaseEdgeStyleProps;

type ParsedLineStyleProps = Required<LineStyleProps>;

/**
 * Draw line based on BaseEdge, override drawKeyShape
 */
export class Line extends BaseEdge {
  static defaultStyleProps: Partial<LineStyleProps> = {};

  constructor(options: DisplayObjectConfig<LineStyleProps>) {
    super(deepMix({}, { style: Line.defaultStyleProps }, options));
  }

  protected getKeyPath(attributes: ParsedLineStyleProps): PathArray {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    return [
      ['M', sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0], targetPoint[1]],
    ];
  }
}
