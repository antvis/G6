import type { DisplayObjectConfig, Group } from '@antv/g';
import { Image as GImage, ImageStyleProps as GImageStyleProps, Rect as GRect } from '@antv/g';
import { deepMix } from '@antv/util';
import type { BaseNodeProps } from '../../types';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';
import { PolygonKeyStyleProps, PolygonStyleProps } from './polygon';

type ImageKeyStyleProps = BaseNodeProps<BaseNodeProps & GImageStyleProps>;
export type ImageStyleProps = BaseNodeStyleProps<ImageKeyStyleProps>;
type ParsedImageStyleProps = Required<ImageStyleProps>;
type ImageOptions = DisplayObjectConfig<ImageStyleProps>;
type HaloStyleProps = Required<PolygonStyleProps<PolygonKeyStyleProps>>;

export class Image extends BaseNode<ImageKeyStyleProps, GImage> {
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

    const { fill: keyStyleFill, stroke: keyStyleStroke, ...keyStyle } = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<ImageStyleProps>(this.getGraphicStyle(attributes), 'halo');
    const haloLineWidth = Number(haloStyle.lineWidth);
    const width = Number(attributes.width) + haloLineWidth;
    const height = Number(attributes.height) + haloLineWidth;
    const fill = 'transparent';

    return { ...keyStyle, ...haloStyle, width, height, fill } as HaloStyleProps;
  }

  protected drawKeyShape(attributes: ParsedImageStyleProps, container: Group): GImage | undefined {
    return this.upsert('key', GImage, this.getKeyStyle(attributes), container);
  }

  protected drawHaloShape(attributes: ParsedImageStyleProps, container: Group): void {
    this.upsert('halo', GRect, this.getHaloStyle(attributes), container);
  }
}
