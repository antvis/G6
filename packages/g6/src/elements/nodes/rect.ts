import type { DisplayObjectConfig, RectStyleProps as GRectStyleProps, Group } from '@antv/g';
import { Rect as GRect } from '@antv/g';
import { deepMix } from '@antv/util';
import type { BaseNodeProps } from '../../types';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type RectStyleProps = BaseNodeStyleProps<BaseNodeProps>;
type ParsedRectStyleProps = Required<RectStyleProps>;
type RectOptions = DisplayObjectConfig<RectStyleProps>;

/**
 * Draw Rect based on BaseNode, override drawKeyShape.
 */
export class Rect extends BaseNode<BaseNodeProps, GRect> {
  static defaultStyleProps: Partial<RectStyleProps> = {
    width: 100,
    height: 30,
  };

  constructor(options: RectOptions) {
    super(deepMix({}, { style: Rect.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedRectStyleProps): GRectStyleProps {
    return {
      ...(super.getKeyStyle(attributes) as GRectStyleProps),
      anchor: [0.5, 0.5], // !!! It cannot be set to default values because G.CustomElement cannot handle it properly.
    };
  }

  protected drawKeyShape(attributes: ParsedRectStyleProps, container: Group): GRect | undefined {
    return this.upsert('key', GRect, this.getKeyStyle(attributes), container);
  }
}
