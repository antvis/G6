import type { DisplayObjectConfig, Group } from '@antv/g';
import { deepMix } from '@antv/util';
import { BaseShape } from './base-shape';
import type { LabelStyleProps } from './label';
import { Label } from './label';

export type BadgeStyleProps = LabelStyleProps;
type ParsedBadgeStyleProps = Required<BadgeStyleProps>;
type BadgeOptions = DisplayObjectConfig<BadgeStyleProps>;

export class Badge extends BaseShape<BadgeStyleProps> {
  static defaultStyleProps: Partial<BadgeStyleProps> = {
    padding: [2, 4, 2, 4],
    fontSize: 10,
    wordWrap: false,
    backgroundRadius: '50%',
    backgroundOpacity: 1,
  };

  constructor(options: BadgeOptions) {
    super(deepMix({}, { style: Badge.defaultStyleProps }, options));
  }

  protected getBadgeStyle(attributes: ParsedBadgeStyleProps) {
    return this.getGraphicStyle(attributes);
  }

  public render(attributes: ParsedBadgeStyleProps = this.parsedAttributes, container: Group = this) {
    this.upsert('label', Label, this.getBadgeStyle(attributes), container);
  }

  connectedCallback() {
    this.upsert('label', Label, this.getBadgeStyle(this.parsedAttributes), this);
  }
}
