import type {
  DisplayObjectConfig,
  ImageStyleProps as GImageStyleProps,
  RectStyleProps as GRectStyleProps,
  Group,
} from '@antv/g';
import { Image as GImage, Rect as GRect } from '@antv/g';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type KeyShapeStyleProps = GImageStyleProps;
export type ImageStyleProps = BaseNodeStyleProps<KeyShapeStyleProps>;
type ParsedImageStyleProps = Required<ImageStyleProps>;
type ImageOptions = DisplayObjectConfig<ImageStyleProps>;

/**
 * Draw image based on BaseNode, override drawKeyShape.
 */
export class Image extends BaseNode<GImageStyleProps, GImage> {
  constructor(options: ImageOptions) {
    super(options);
  }

  protected getHaloStyle(attributes: ParsedImageStyleProps): GRectStyleProps {
    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo') as Partial<GRectStyleProps>;
    const keyStyle = this.getKeyStyle(attributes);

    const { width, height } = keyStyle;

    const haloWidth = Number(width) || 0;
    const haloHeight = Number(height) || 0;

    return {
      ...keyStyle,
      width: haloWidth,
      height: haloHeight,
      ...haloStyle,
    } as GRectStyleProps;
  }

  protected drawKeyShape(attributes: ParsedImageStyleProps, container: Group): GImage {
    const keyStyle: GImageStyleProps = {
      ...this.getKeyStyle(attributes),
      anchor: [0.5, 0.5],
    };
    return this.upsert('key', GImage, keyStyle, container) as GImage;
  }

  protected drawHaloShape(attributes: ParsedImageStyleProps, container: Group) {
    const haloStyle: GRectStyleProps = {
      ...this.getHaloStyle(attributes),
      anchor: [0.5, 0.5],
    };
    this.upsert('halo', GRect, haloStyle, container);
  }

  connectedCallback() {}
}
