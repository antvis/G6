import type { DisplayObjectConfig, Group, IAnimation } from '@antv/g';
import { deepMix } from '@antv/util';
import { BaseShape } from '../base';
import type { LabelStyleProps } from '../label';
import { Label } from '../label';

export type BadgeStyleProps = LabelStyleProps;

type ParsedBadgeStyleProps = Required<BadgeStyleProps>;

export type BadgeOptions = DisplayObjectConfig<BadgeStyleProps>;

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

  public render(attributes = this.attributes as ParsedBadgeStyleProps, container: Group = this) {
    this.upsert('label', Label, this.getBadgeStyle(attributes), container);
  }

  animate(keyframes: PropertyIndexedKeyframes | Keyframe[], options?: number | KeyframeAnimationOptions): IAnimation {
    if (!keyframes) return null;

    const result = super.animate(keyframes, options);

    if (Array.isArray(keyframes)) {
      this.AnimateMap.label = this.ShapeMap.label.animate(keyframes as unknown as Keyframe[], options);
    }

    return this.proxyAnimate(result);
  }
}
