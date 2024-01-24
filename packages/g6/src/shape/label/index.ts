import { DisplayObjectConfig, Group, IAnimation, Rect, RectStyleProps, Text, TextStyleProps } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Padding } from '../../types';
import type { PrefixObject } from '../../types/prefix';
import { parsePadding } from '../../utils/padding';
import { omitStyleProps, startsWith, subStyleProps } from '../../utils/prefix';
import { BaseShape, BaseShapeStyleProps } from '../base';

export type LabelStyleProps = BaseShapeStyleProps &
  TextStyleProps &
  PrefixObject<RectStyleProps, 'background'> & {
    padding?: Padding;
  };

type ParsedLabelStyleProps = Required<LabelStyleProps>;

export type LabelOptions = DisplayObjectConfig<LabelStyleProps>;

export class Label extends BaseShape<LabelStyleProps> {
  static defaultStyleProps: Partial<LabelStyleProps> = {
    padding: 5,
    backgroundZIndex: -1,
  };

  constructor(options: LabelOptions) {
    super(deepMix({}, { style: Label.defaultStyleProps }, options));
  }

  protected isTextStyle(key: string) {
    return startsWith(key, 'label');
  }

  protected isBackgroundStyle(key: string) {
    return startsWith(key, 'background');
  }

  protected getTextStyle(attributes: LabelStyleProps = this.attributes) {
    const style = this.getGraphicStyle(attributes);
    return omitStyleProps<TextStyleProps>(style, 'background');
  }

  protected getBackgroundStyle(attributes: LabelStyleProps = this.attributes) {
    const style = this.getGraphicStyle(attributes);
    const { wordWrapWidth, padding } = style;
    const backgroundStyle = subStyleProps<RectStyleProps>(style, 'background');

    const {
      min: [minX, minY],
      halfExtents: [halfWidth, halfHeight],
    } = this.ShapeMap.text.getLocalBounds();

    const [top, right, bottom, left] = parsePadding(padding);

    Object.assign(backgroundStyle, {
      x: minX - left,
      y: minY - top,
      width: (wordWrapWidth || halfWidth * 2) + left + right,
      height: halfHeight * 2 + top + bottom,
    });

    // parse percentage radius
    const { radius } = backgroundStyle;
    // if radius look like '10%', convert it to number
    if (typeof radius === 'string' && radius.endsWith('%')) {
      const percentage = Number(radius.replace('%', '')) / 100;
      backgroundStyle.radius = Math.min(+backgroundStyle.width, +backgroundStyle.height) * percentage;
    }

    return backgroundStyle;
  }

  public render(attributes = this.attributes as ParsedLabelStyleProps, container: Group = this): void {
    this.upsert('text', Text, this.getTextStyle(attributes), container);
    this.upsert('background', Rect, this.getBackgroundStyle(attributes), container);
  }

  animate(
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions | undefined,
  ): IAnimation | null {
    if (!keyframes) return null;

    const result = super.animate(keyframes, options);

    // see: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
    if (Array.isArray(keyframes)) {
      this.AnimateMap.text = this.ShapeMap.text.animate(
        keyframes.map((style) => this.getTextStyle(style as unknown as TextStyleProps)) as unknown as Keyframe[],
        options,
      );
      this.AnimateMap.background = this.ShapeMap.background.animate(
        keyframes.map((style) => this.getBackgroundStyle(style as unknown as LabelStyleProps)) as unknown as Keyframe[],
        options,
      );
    } else {
      // TODO: support PropertyIndexedKeyframes
    }

    return this.proxyAnimate(result);
  }
}
