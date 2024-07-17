import { DisplayObjectConfig, Group, Rect, RectStyleProps, Text, TextStyleProps } from '@antv/g';
import type { Padding } from '../../types/padding';
import type { Prefix } from '../../types/prefix';
import { parsePadding } from '../../utils/padding';
import { omitStyleProps, startsWith, subStyleProps } from '../../utils/prefix';
import { mergeOptions } from '../../utils/style';
import { BaseShape } from './base-shape';

/**
 * <zh/> 标签样式
 *
 * <en/> Label style
 */
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

/**
 * <zh/> 标签
 *
 * <en/> Label
 * @remarks
 * <zh/> 标签是一种具有背景的文本图形。
 *
 * <en/> Label is a text shape with background.
 */
export class Label extends BaseShape<LabelStyleProps> {
  static defaultStyleProps: Partial<LabelStyleProps> = {
    padding: 0,
    fontSize: 12,
    fontFamily: 'system-ui, sans-serif',
    wordWrap: true,
    maxLines: 1,
    wordWrapWidth: 128,
    textOverflow: '...',
    textBaseline: 'middle',
    backgroundOpacity: 0.75,
    backgroundZIndex: -1,
    backgroundLineWidth: 0,
  };

  constructor(options: DisplayObjectConfig<LabelStyleProps>) {
    super(mergeOptions({ style: Label.defaultStyleProps }, options));
  }

  protected isTextStyle(key: string) {
    return startsWith(key, 'label');
  }

  protected isBackgroundStyle(key: string) {
    return startsWith(key, 'background');
  }

  protected getTextStyle(attributes: Required<LabelStyleProps>) {
    const { padding, ...style } = this.getGraphicStyle(attributes);
    return omitStyleProps<TextStyleProps>(style, 'background');
  }

  protected getBackgroundStyle(attributes: Required<LabelStyleProps>) {
    if (attributes.background === false) return false;

    const style = this.getGraphicStyle(attributes);
    const { wordWrap, wordWrapWidth, padding } = style;
    const backgroundStyle = subStyleProps<RectStyleProps>(style, 'background');

    const {
      min: [minX, minY],
      center: [centerX, centerY],
      halfExtents: [halfWidth, halfHeight],
    } = this.shapeMap.text.getGeometryBounds();

    const [top, right, bottom, left] = parsePadding(padding);
    const totalWidth = halfWidth * 2 + left + right;

    const { width, height } = backgroundStyle;
    if (width && height) {
      Object.assign(backgroundStyle, { x: centerX - Number(width) / 2, y: centerY - Number(height) / 2 });
    } else {
      Object.assign(backgroundStyle, {
        x: minX - left,
        y: minY - top,
        width: wordWrap ? Math.min(totalWidth, wordWrapWidth + left + right) : totalWidth,
        height: halfHeight * 2 + top + bottom,
      });
    }

    // parse percentage radius
    const { radius } = backgroundStyle;
    // if radius look like '10%', convert it to number
    if (typeof radius === 'string' && radius.endsWith('%')) {
      const percentage = Number(radius.replace('%', '')) / 100;
      backgroundStyle.radius = Math.min(+backgroundStyle.width, +backgroundStyle.height) * percentage;
    }

    return backgroundStyle;
  }

  public render(attributes: Required<LabelStyleProps> = this.parsedAttributes, container: Group = this): void {
    this.upsert('text', Text, this.getTextStyle(attributes), container);
    this.upsert('background', Rect, this.getBackgroundStyle(attributes), container);
  }

  public getGeometryBounds() {
    const shape = this.getShape('background') || this.getShape('text');
    return shape.getGeometryBounds();
  }
}
