import type { DisplayObjectConfig } from '@antv/g';
import { PathArray, deepMix } from '@antv/util';
import type { BaseEdgeStyleProps, ParsedBaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

type LineKeyStyleProps = {};

export type LineStyleProps = BaseEdgeStyleProps<LineKeyStyleProps>;

type LineOptions = DisplayObjectConfig<LineStyleProps>;

/**
 * Draw line based on BaseEdge, override drawKeyShape
 */
export class Line extends BaseEdge<LineKeyStyleProps> {
  static defaultStyleProps: Partial<LineStyleProps> = {};

  constructor(options: LineOptions) {
    super(deepMix({}, { style: Line.defaultStyleProps }, options));
  }

  protected getKeyPath(attributes: ParsedBaseEdgeStyleProps<LineKeyStyleProps>): PathArray {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    return [
      ['M', sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0], targetPoint[1]],
    ];
  }
}
