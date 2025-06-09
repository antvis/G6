import type { DisplayObjectConfig, RectStyleProps as GRectStyleProps } from '@antv/g';
import { Rect as GRect, Group } from '@antv/g';
import { subStyleProps } from '../../utils/prefix';
import type { BaseComboStyleProps } from './base-combo';
import { BaseCombo } from './base-combo';
import { UnknownStruct } from '../../types/utility';

/**
 * <zh/> 矩形组合样式配置项
 *
 * <en/> Rect combo style props
 */
export interface RectComboStyleProps<NodeType extends UnknownStruct = UnknownStruct, ComboType extends UnknownStruct = UnknownStruct> extends BaseComboStyleProps<NodeType, ComboType> {}

/**
 * <zh/> 矩形组合
 *
 * <en/> Rect combo
 */
export class RectCombo<NodeType extends UnknownStruct = UnknownStruct, ComboType extends UnknownStruct = UnknownStruct> extends BaseCombo<RectComboStyleProps<NodeType, ComboType>> {
  constructor(options: DisplayObjectConfig<RectComboStyleProps<NodeType, ComboType>>) {
    super(options);
  }

  protected drawKeyShape(attributes: Required<RectComboStyleProps<NodeType, ComboType>>, container: Group): GRect | undefined {
    return this.upsert('key', GRect, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: Required<RectComboStyleProps<NodeType, ComboType>>): GRectStyleProps {
    const keyStyle = super.getKeyStyle(attributes);

    const [width, height] = this.getKeySize(attributes);
    return {
      ...keyStyle,
      ...(attributes.collapsed && subStyleProps(keyStyle, 'collapsed')),
      width,
      height,
      x: -width / 2,
      y: -height / 2,
    };
  }
}
