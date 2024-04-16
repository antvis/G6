import type { DisplayObjectConfig, RectStyleProps as GRectStyleProps } from '@antv/g';
import { Rect as GRect, Group } from '@antv/g';
import { deepMix } from '@antv/util';
import { subStyleProps } from '../../utils/prefix';
import type { BaseComboStyleProps } from './base-combo';
import { BaseCombo } from './base-combo';

export type RectComboStyleProps = BaseComboStyleProps;

export class RectCombo extends BaseCombo<RectComboStyleProps> {
  static defaultStyleProps: Partial<RectComboStyleProps> = {
    anchor: [0.5, 0.5],
  };

  constructor(options: DisplayObjectConfig<RectComboStyleProps>) {
    super(deepMix({}, { style: RectCombo.defaultStyleProps }, options));
  }

  protected drawKeyShape(attributes: Required<RectComboStyleProps>, container: Group): GRect | undefined {
    return this.upsert('key', GRect, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: Required<RectComboStyleProps>): GRectStyleProps {
    const keyStyle = super.getKeyStyle(attributes);
    const collapsedStyle = subStyleProps(keyStyle, 'collapsed');

    const [width, height] = this.getKeySize(attributes);
    return {
      ...keyStyle,
      ...(attributes.collapsed && collapsedStyle),
      width,
      height,
    };
  }
}
