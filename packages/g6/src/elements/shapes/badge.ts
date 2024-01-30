import type { DisplayObjectConfig, Group } from '@antv/g';
import { deepMix } from '@antv/util';
import { BaseShape } from './base-shape';
import type { LabelStyleProps } from './label';
import { Label } from './label';

export type BadgeStyleProps = LabelStyleProps;
type BadgeOptions = DisplayObjectConfig<BadgeStyleProps>;

export class Badge extends BaseShape<BadgeStyleProps> {
  static defaultStyleProps: Partial<BadgeStyleProps> = {
    backgroundRadius: '50%',
    zIndex: 1,
  };

  constructor(options: BadgeOptions) {
    super(deepMix({}, { style: Badge.defaultStyleProps }, options));
  }

  protected getBadgeStyle(attributes: BadgeStyleProps) {
    return this.getGraphicStyle(attributes);
  }

  public render(attributes = this.attributes, container: Group = this) {
    this.upsert('label', Label, this.getBadgeStyle(attributes), container);
  }

  connectedCallback() {
    this.upsert('label', Label, this.getBadgeStyle(this.attributes), this);
  }
}
