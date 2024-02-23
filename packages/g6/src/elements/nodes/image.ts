import type { DisplayObjectConfig, RectStyleProps as GRectStyleProps, Group } from '@antv/g';
import { Image as GImage, ImageStyleProps as GImageStyleProps, Rect as GRect } from '@antv/g';
import { deepMix } from '@antv/util';
import { ICON_SIZE_RATIO } from '../../constants/element';
import type { BaseNodeProps, PrefixObject } from '../../types';
import { subStyleProps } from '../../utils/prefix';
import type { IconStyleProps } from '../shapes';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type ImageKeyStyleProps = BaseNodeProps & GImageStyleProps;
type HaloStyleProps = GRectStyleProps;
export type ImageStyleProps = BaseNodeStyleProps<ImageKeyStyleProps> &
  // Halo
  PrefixObject<HaloStyleProps, 'halo'>;
type ParsedImageStyleProps = Required<ImageStyleProps>;
type ImageOptions = DisplayObjectConfig<ImageStyleProps>;

export class Image extends BaseNode<ImageKeyStyleProps, GImage> {
  static defaultStyleProps: Partial<ImageStyleProps> = {
    width: 50,
    height: 50,
  };

  constructor(options: ImageOptions) {
    super(deepMix({}, { style: Image.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedImageStyleProps): ImageKeyStyleProps {
    const keyStyle = super.getKeyStyle(attributes) as unknown as ParsedImageStyleProps;
    return {
      ...keyStyle,
      anchor: [0.5, 0.5] as [number, number],
    };
  }

  // @ts-expect-error The return type of this method is not compatible with the return type of its overridden method.
  protected getHaloStyle(attributes: ParsedImageStyleProps): false | HaloStyleProps {
    if (attributes.halo === false) return false;

    const { fill: keyStyleFill, stroke: keyStyleStroke, ...keyStyle } = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<ImageStyleProps>(this.getGraphicStyle(attributes), 'halo');
    const haloLineWidth = Number(haloStyle.lineWidth);
    const width = Number(attributes.width) + haloLineWidth;
    const height = Number(attributes.height) + haloLineWidth;
    const fill = 'transparent';

    return { ...keyStyle, ...haloStyle, width, height, fill } as unknown as HaloStyleProps;
  }

  protected getIconStyle(attributes: ParsedImageStyleProps): false | IconStyleProps {
    const style = super.getIconStyle(attributes);
    const { width, height } = this.getKeyStyle(attributes);

    return style
      ? ({
          width: (width as number) * ICON_SIZE_RATIO,
          height: (height as number) * ICON_SIZE_RATIO,
          ...style,
        } as IconStyleProps)
      : false;
  }

  protected drawKeyShape(attributes: ParsedImageStyleProps, container: Group): GImage | undefined {
    return this.upsert('key', GImage, this.getKeyStyle(attributes), container);
  }

  protected drawHaloShape(attributes: ParsedImageStyleProps, container: Group): void {
    this.upsert('halo', GRect, this.getHaloStyle(attributes), container);
  }
}
