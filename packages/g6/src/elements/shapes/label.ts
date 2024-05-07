import { DisplayObjectConfig, Group, Rect, RectStyleProps, Text, TextStyleProps } from '@antv/g';
import { deepMix } from '@antv/util';
import type { Padding } from '../../types/padding';
import type { Prefix } from '../../types/prefix';
import { parsePadding } from '../../utils/padding';
import { omitStyleProps, startsWith, subStyleProps } from '../../utils/prefix';
import { BaseShape } from './base-shape';

export interface LabelStyleProps extends TextStyleProps, Prefix<'background', RectStyleProps> {
  /**
   * <zh/> 是否显示背景
   *
   * <en/> Whether to show background
   */
  background?: boolean;
  /**
   * <zh/> 标签内边距
   *
   * <en/> Label padding
   * @defaultValue 0
   */
  padding?: Padding;
}
type ParsedLabelStyleProps = Required<LabelStyleProps>;
type LabelOptions = DisplayObjectConfig<LabelStyleProps>;

export class Label extends BaseShape<LabelStyleProps> {
  static defaultStyleProps: Partial<LabelStyleProps> = {
    padding: 0,
    fontSize: 12,
    wordWrap: true,
    maxLines: 1,
    wordWrapWidth: 128,
    textOverflow: '...',
    textBaseline: 'middle',
    backgroundOpacity: 0.75,
    backgroundZIndex: -1,
    backgroundLineWidth: 0,
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

  protected getTextStyle(attributes: ParsedLabelStyleProps) {
    const { padding, ...style } = this.getGraphicStyle(attributes);
    return omitStyleProps<TextStyleProps>(style, 'background');
  }

  protected getBackgroundStyle(attributes: ParsedLabelStyleProps) {
    if (attributes.background === false) return false;

    const style = this.getGraphicStyle(attributes);
    const { wordWrap, wordWrapWidth, padding } = style;
    const backgroundStyle = subStyleProps<RectStyleProps>(style, 'background');

    const {
      min: [minX, minY],
      halfExtents: [halfWidth, halfHeight],
    } = this.shapeMap.text.getGeometryBounds();

    const [top, right, bottom, left] = parsePadding(padding);

    Object.assign(backgroundStyle, {
      x: minX - left,
      y: minY - top,
      width: wordWrap ? Math.min(halfWidth * 2 + left + right, wordWrapWidth) : halfWidth * 2 + left + right,
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

  public render(attributes: ParsedLabelStyleProps = this.parsedAttributes, container: Group = this): void {
    this.upsert('text', Text, this.getTextStyle(attributes), container);
    this.upsert('background', Rect, this.getBackgroundStyle(attributes), container);
  }
}
