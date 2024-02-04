import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

type KeyShapeStyleProps = GCircleStyleProps;
export type CircleStyleProps = BaseNodeStyleProps<KeyShapeStyleProps>;
type ParsedCircleStyleProps = Required<CircleStyleProps>;
type CircleOptions = DisplayObjectConfig<CircleStyleProps>;

/**
 * Draw circle based on BaseNode, override drawKeyShape.
 */
export class Circle extends BaseNode<GCircleStyleProps, GCircle> {
  constructor(options: CircleOptions) {
    super(options);
  }

  protected getHaloStyle(attributes: ParsedCircleStyleProps) {
    if (attributes.halo === false) return false;

    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo') as Partial<GCircleStyleProps>;
    const keyStyle = this.getKeyStyle(attributes);

    const { lineWidth } = haloStyle;
    const { r } = keyStyle;

    const haloR = Number(r) + Number(lineWidth) / 2 || 0;

    return {
      ...keyStyle,
      r: haloR,
      ...haloStyle,
    } as GCircleStyleProps;
  }

  protected drawKeyShape(attributes: ParsedCircleStyleProps, container: Group): GCircle {
    return this.upsert('key', GCircle, this.getKeyStyle(attributes), container) as GCircle;
  }

  connectedCallback() {}
}
