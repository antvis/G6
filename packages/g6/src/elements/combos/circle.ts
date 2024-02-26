import { DisplayObjectConfig, Circle as GCircle, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import type { BaseComboStyleProps, ParsedBaseComboStyleProps } from './base-combo';
import { BaseCombo } from './base-combo';

type KeyStyleProps = GCircleStyleProps;
export type CircleComboStyleProps = BaseComboStyleProps<KeyStyleProps>;
type ParsedCircleComboStyleProps = ParsedBaseComboStyleProps<CircleComboStyleProps>;
type CircleComboOptions = DisplayObjectConfig<CircleComboStyleProps>;

export class CircleCombo extends BaseCombo<GCircle> {
  constructor(options: CircleComboOptions) {
    super(options);
  }

  protected drawKeyShape(attributes: ParsedCircleComboStyleProps, container: Group): GCircle | undefined {
    return this.upsert('key', GCircle, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedCircleComboStyleProps): GCircleStyleProps {
    const { x, y, children, collapsed, ...keyStyle } = super.getKeyStyle(attributes);
    const { center, width, height } = this.getRenderSize(attributes);

    // If the combo is expanded, the radius of the circle is half of diagonal length to ensure the circle can contain all the children
    const r = collapsed ? Math.max(width, height) / 2 : Math.sqrt(width ** 2 + height ** 2) / 2;
    return {
      ...keyStyle,
      cx: x || center[0],
      cy: y || center[1],
      r,
    };
  }
}
