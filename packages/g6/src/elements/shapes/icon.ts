import { DisplayObjectConfig, Image as GImage, Text as GText, Group, ImageStyleProps, TextStyleProps } from '@antv/g';
import type { BaseShapeStyleProps } from './base-shape';
import { BaseShape } from './base-shape';

export type IconStyleProps = BaseShapeStyleProps & Partial<TextStyleProps> & Partial<ImageStyleProps>;

type IconOptions = DisplayObjectConfig<IconStyleProps>;

export class Icon extends BaseShape<IconStyleProps> {
  constructor(options: IconOptions) {
    super(options);
  }

  private isGImage() {
    return !!this.getAttribute('src');
  }

  protected getIconStyle(attributes: IconStyleProps = this.attributes): IconStyleProps {
    const style = this.getGraphicStyle(attributes);

    if (this.isGImage()) {
      return {
        anchor: [0.5, 0.5],
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

  connectedCallback() {
    this.upsert('icon', (this.isGImage() ? GImage : GText) as any, this.getIconStyle(this.attributes), this);
  }
}
