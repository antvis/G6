import type { DisplayObjectConfig, RectStyleProps as GRectStyleProps, Group } from '@antv/g';
import { Rect as GRect } from '@antv/g';
import { deepMix } from '@antv/util';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { IconStyleProps } from '../shapes';
import type { BaseNodeStyleProps, ParsedBaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type RectStyleProps = BaseNodeStyleProps<KeyStyleProps>;
type ParsedRectStyleProps = ParsedBaseNodeStyleProps<KeyStyleProps>;
type KeyStyleProps = GRectStyleProps;

/**
 * Draw Rect based on BaseNode, override drawKeyShape.
 */
export class Rect extends BaseNode<GRect, KeyStyleProps> {
  static defaultStyleProps: Partial<RectStyleProps> = {
    size: [100, 30],
  };

  constructor(options: DisplayObjectConfig<RectStyleProps>) {
    super(deepMix({}, { style: Rect.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedRectStyleProps): KeyStyleProps {
    const [width, height] = this.getSize(attributes);
    return {
      ...(super.getKeyStyle(attributes) as KeyStyleProps),
      width,
      height,
      anchor: [0.5, 0.5], // !!! It cannot be set to default values because G.CustomElement cannot handle it properly.
    };
  }

  protected getIconStyle(attributes: ParsedRectStyleProps): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const { width, height } = this.getKeyStyle(attributes);

    return style
      ? ({
          width: (width as number) * ICON_SIZE_RATIO,
          height: (height as number) * ICON_SIZE_RATIO,
          ...style,
        } as IconStyleProps)
      : false;
  }

  protected drawKeyShape(attributes: ParsedRectStyleProps, container: Group): GRect | undefined {
    return this.upsert('key', GRect, this.getKeyStyle(attributes), container);
  }
}
