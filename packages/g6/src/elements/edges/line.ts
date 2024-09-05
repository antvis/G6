import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';
import { mergeOptions } from '../../utils/style';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

/**
 * <zh/> 直线样式配置项
 *
 * <en/> Line style properties
 */
export interface LineStyleProps extends BaseEdgeStyleProps {}

type ParsedLineStyleProps = Required<LineStyleProps>;

/**
 * <zh/> 直线
 *
 * <en/> Line
 */
export class Line extends BaseEdge {
  static defaultStyleProps: Partial<LineStyleProps> = {};

  constructor(options: DisplayObjectConfig<LineStyleProps>) {
    super(mergeOptions({ style: Line.defaultStyleProps }, options));
  }

  protected getKeyPath(attributes: ParsedLineStyleProps): PathArray {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    return [
      ['M', sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0], targetPoint[1]],
    ];
  }
}
