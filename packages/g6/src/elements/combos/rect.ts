import type { DisplayObjectConfig, RectStyleProps as GRectStyleProps } from '@antv/g';
import { Rect as GRect, Group } from '@antv/g';
import { subStyleProps } from '../../utils/prefix';
import type { BaseComboStyleProps } from './base-combo';
import { BaseCombo } from './base-combo';

/**
 * <zh/> 矩形组合样式配置项
 *
 * <en/> Rect combo style props
 */
export interface RectComboStyleProps extends BaseComboStyleProps {}

/**
 * <zh/> 矩形组合
 *
 * <en/> Rect combo
 */
export class RectCombo extends BaseCombo<RectComboStyleProps> {
  constructor(options: DisplayObjectConfig<RectComboStyleProps>) {
    super(options);
  }

  protected drawKeyShape(attributes: Required<RectComboStyleProps>, container: Group): GRect | undefined {
    return this.upsert('key', GRect, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: Required<RectComboStyleProps>): GRectStyleProps {
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
