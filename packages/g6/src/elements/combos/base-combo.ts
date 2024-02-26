import type { DisplayObjectConfig, Group } from '@antv/g';
import { BaseStyleProps, DisplayObject } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import type { BaseComboProps, Combo, Node } from '../../types';
import { getComboRenderSize } from '../../utils/combo';
import { getXYByPosition } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import { BaseNode, BaseNodeStyleProps } from '../nodes';
import type { IconStyleProps } from '../shapes';

export type BaseComboStyleProps<KeyStyleProps extends BaseStyleProps = BaseComboProps> = BaseComboProps &
  BaseNodeStyleProps<KeyStyleProps>;
export type ParsedBaseComboStyleProps<KeyStyleProps extends BaseStyleProps> = Required<
  BaseComboStyleProps<KeyStyleProps>
>;

export abstract class BaseCombo<
  KeyShape extends DisplayObject,
  KeyStyleProps extends BaseStyleProps = BaseComboProps,
> extends BaseNode<KeyShape, KeyStyleProps> {
  static defaultStyleProps: BaseComboStyleProps = {
    collapsed: false,
    padding: 0,
    children: {},
  };

  constructor(options: DisplayObjectConfig<BaseComboStyleProps<KeyStyleProps>>) {
    super(deepMix({}, { style: BaseCombo.defaultStyleProps }, options));
  }

  protected getRenderSize(attributes: ParsedBaseComboStyleProps<KeyStyleProps>) {
    const [dWidth, dHeight] = this.getSize(attributes);
    const { collapsed, children, padding } = attributes;
    return getComboRenderSize(collapsed as boolean, dWidth, dHeight, children as Record<string, Node | Combo>, padding);
  }

  protected abstract drawKeyShape(
    attributes: ParsedBaseComboStyleProps<KeyStyleProps>,
    container: Group,
  ): KeyShape | undefined;

  protected getIconStyle(attributes: ParsedBaseComboStyleProps<KeyStyleProps>): false | IconStyleProps {
    if (attributes.icon === false) return false;

    const { text: textProps, ...iconStyle } = subStyleProps<IconStyleProps>(this.getGraphicStyle(attributes), 'icon');
    const keyShape = this.getKey();
    const [x, y] = getXYByPosition(keyShape.getLocalBounds(), 'center');

    const { contentType, children } = attributes;
    let text = textProps;
    if (contentType === 'childCount') {
      // Get the number of first-level child nodes
      text = (Object.keys(children as Record<string, Node | Combo>).length || 0).toString();
    }

    if (attributes.collapsed === false || isEmpty(text)) return false;

    return {
      x,
      y,
      ...iconStyle,
      text,
    };
  }
}
