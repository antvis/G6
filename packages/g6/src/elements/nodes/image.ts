import type { DisplayObjectConfig, RectStyleProps as GRectStyleProps, Group } from '@antv/g';
import { Image as GImage, ImageStyleProps as GImageStyleProps, Rect as GRect } from '@antv/g';
import { deepMix } from '@antv/util';
import { ICON_SIZE_RATIO } from '../../constants/element';
import { subStyleProps } from '../../utils/prefix';
import { add } from '../../utils/vector';
import type { IconStyleProps } from '../shapes';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type ImageStyleProps = BaseNodeStyleProps<{
  img?: string | HTMLImageElement;
  src?: string | HTMLImageElement;
}>;

export class Image extends BaseNode<ImageStyleProps> {
  static defaultStyleProps: Partial<ImageStyleProps> = {
    size: 50,
  };

  constructor(options: DisplayObjectConfig<ImageStyleProps>) {
    super(deepMix({}, { style: Image.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: Required<ImageStyleProps>): GImageStyleProps {
    const [width, height] = this.getSize(attributes);
    const keyStyle = super.getKeyStyle(attributes);
    return {
      ...keyStyle,
      width,
      height,
      anchor: [0.5, 0.5] as [number, number],
    };
  }

  protected getHaloStyle(attributes: Required<ImageStyleProps>): false | GRectStyleProps {
    if (attributes.halo === false) return false;
    const { fill: keyStyleFill, stroke: keyStyleStroke, ...keyStyle } = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo');
    const haloLineWidth = Number(haloStyle.lineWidth);
    const [width, height] = add(this.getSize(attributes), [haloLineWidth, haloLineWidth]);
    const fill = 'transparent';

    return { ...keyStyle, ...haloStyle, width, height, fill };
  }

  protected getIconStyle(attributes: Required<ImageStyleProps>): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const [width, height] = this.getSize(attributes);

    return style
      ? ({
          width: width * ICON_SIZE_RATIO,
          height: height * ICON_SIZE_RATIO,
          ...style,
        } as IconStyleProps)
      : false;
  }

  protected drawKeyShape(attributes: Required<ImageStyleProps>, container: Group): GImage | undefined {
    return this.upsert('key', GImage, this.getKeyStyle(attributes), container);
  }

  protected drawHaloShape(attributes: Required<ImageStyleProps>, container: Group): void {
    this.upsert('halo', GRect, this.getHaloStyle(attributes), container);
  }
}
