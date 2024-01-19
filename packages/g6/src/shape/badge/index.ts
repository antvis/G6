import type { DisplayObjectConfig, Group, IAnimation } from '@antv/g';
import { deepMix } from '@antv/util';
import type { ReplacePrefix } from '../../types/prefix';
import { replacePrefix } from '../../utils/prefix';
import { BaseShape } from '../base';
import type { LabelStyleProps } from '../label';
import { Label } from '../label';

export type BadgeStyleProps = ReplacePrefix<LabelStyleProps, 'label', 'badge'>;

type ParsedBadgeStyleProps = Required<BadgeStyleProps>;

export type BadgeOptions = DisplayObjectConfig<BadgeStyleProps>;

export class Badge extends BaseShape<BadgeStyleProps> {
  static defaultStyleProps: Partial<BadgeStyleProps> = {};

  constructor(options: BadgeOptions) {
    super(deepMix({}, { style: Badge.defaultStyleProps }, options));
  }

  protected getLabelStyle(attributes: BadgeStyleProps = this.attributes): LabelStyleProps {
    const style = replacePrefix(attributes, 'badge', 'label');
    Object.assign(style, { backgroundRadius: '50%' });

    return style;
  }

  public render(attributes = this.attributes as ParsedBadgeStyleProps, container: Group = this) {
    this.upsert('label', Label, this.getLabelStyle(attributes), container);
  }

  animate(keyframes: PropertyIndexedKeyframes | Keyframe[], options?: number | KeyframeAnimationOptions): IAnimation {
    if (!keyframes) return null;

    const result = super.animate(keyframes, options);

    if (Array.isArray(keyframes)) {
      this.AnimateMap.label = this.ShapeMap.label.animate(
        keyframes.map((style) => this.getLabelStyle(style as unknown as LabelStyleProps)) as unknown as Keyframe[],
        options,
      );
    }

    return this.proxyAnimate(result);
  }
}
