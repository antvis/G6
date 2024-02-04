import type { DisplayObjectConfig, Group } from '@antv/g';
import {
  Image as GImage,
  ImageStyleProps as GImageStyleProps,
  Rect as GRect,
  RectStyleProps as GRectStyleProps,
} from '@antv/g';
import { deepMix } from '@antv/util';
import type { BaseNodeProps } from '../../types';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type ImageStyleProps = BaseNodeStyleProps<BaseNodeProps & GImageStyleProps>;
type ParsedImageStyleProps = Required<ImageStyleProps>;
type ImageOptions = DisplayObjectConfig<ImageStyleProps>;
type HaloStyleProps = BaseNodeStyleProps<BaseNodeProps & GRectStyleProps>;

export class Image extends BaseNode<ImageStyleProps, GImage> {
  static defaultStyleProps: Partial<ImageStyleProps> = {
    width: 50,
    height: 50,
  };

  constructor(options: ImageOptions) {
    super(deepMix({}, { style: Image.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedImageStyleProps): GImageStyleProps {
    const keyStyle = super.getKeyStyle(attributes) as unknown as ParsedImageStyleProps;
    return {
      ...keyStyle,
      anchor: [0.5, 0.5] as [number, number],
    };
  }

  protected getHaloStyle(attributes: ParsedImageStyleProps): false | HaloStyleProps {
    if (attributes.halo === false) return false;

    const keyStyle = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<ImageStyleProps>(this.getGraphicStyle(attributes), 'halo');
    const haloLineWidth = Number(haloStyle.lineWidth);
    const width = Number(attributes.width) + haloLineWidth;
    const height = Number(attributes.height) + haloLineWidth;

    return { ...keyStyle, ...haloStyle, width, height, anchor: [0.5, 0.5] as [number, number] } as HaloStyleProps;
  }

  protected drawKeyShape(attributes: ParsedImageStyleProps, container: Group): GImage | undefined {
    return this.upsert('key', GImage, this.getKeyStyle(attributes), container);
  }

  protected drawHaloShape(attributes: ParsedImageStyleProps, container: Group): void {
    this.upsert('halo', GRect, this.getHaloStyle(attributes) as GRectStyleProps, container);
  }
}
