import { DisplayObjectConfig, Text as GText, Group, TextStyleProps } from '@antv/g';
import type { BaseShapeStyleProps } from './base-shape';
import { BaseShape } from './base-shape';
import type { ImageStyleProps } from './image';
import { Image as GImage } from './image';

/**
 * <zh/> 图标样式
 *
 * <en/> Icon style
 */
export interface IconStyleProps extends BaseShapeStyleProps, Partial<TextStyleProps>, Omit<ImageStyleProps, 'z'> {}

/**
 * <zh/> 图标
 *
 * <en/> Icon
 * @remarks
 * <zh/> 图标是一种特殊的图形，可以是图片或者文字。传入 src 属性时，会渲染图片；传入 text 属性时，会渲染文字。
 *
 * <en/> Icon is a special shape, which can be an image or text. When the src attribute is passed in, an image will be rendered; when the text attribute is passed in, text will be rendered.
 */
export class Icon extends BaseShape<IconStyleProps> {
  constructor(options: DisplayObjectConfig<IconStyleProps>) {
    super(options);
  }

  private isImage() {
    const { src } = this.attributes;
    return !!src;
  }

  protected getIconStyle(attributes: IconStyleProps = this.attributes): IconStyleProps {
    const { width = 0, height = 0 } = attributes;
    const style = this.getGraphicStyle(attributes);
    if (this.isImage()) {
      return {
        x: -width / 2,
        y: -height / 2,
        ...style,
      };
    }
    return {
      textBaseline: 'middle',
      textAlign: 'center',
      ...style,
    };
  }

  public render(attributes = this.attributes, container: Group = this): void {
    this.upsert('icon', (this.isImage() ? GImage : GText) as any, this.getIconStyle(attributes), container);
  }
}
