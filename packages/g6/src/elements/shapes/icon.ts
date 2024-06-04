import { DisplayObjectConfig, Image as GImage, Text as GText, Group, ImageStyleProps, TextStyleProps } from '@antv/g';
import type { BaseShapeStyleProps } from './base-shape';
import { BaseShape } from './base-shape';

export interface IconStyleProps extends BaseShapeStyleProps, Partial<TextStyleProps>, Omit<ImageStyleProps, 'z'> {}

type IconOptions = DisplayObjectConfig<IconStyleProps>;

export class Icon extends BaseShape<IconStyleProps> {
  constructor(options: IconOptions) {
    super(options);
  }

  private isGImage() {
    return !!this.getAttribute('src');
  }

  protected getIconStyle(attributes: IconStyleProps = this.attributes): IconStyleProps {
    const { x = 0, y = 0 } = attributes;
    const style = this.getGraphicStyle(attributes);
    const { width, height } = style;
    if (this.isGImage()) {
      return {
        x: (x as number) - (width as number) / 2,
        y: (y as number) - (height as number) / 2,
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
    this.upsert('icon', (this.isGImage() ? GImage : GText) as any, this.getIconStyle(attributes), container);
  }
}
