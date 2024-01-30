import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { subStyleProps } from '../../utils/prefix';
import type { BaseNodeStyleProps } from './base-node';
import { BaseNode } from './base-node';

export type CircleStyleProps = BaseNodeStyleProps<GCircleStyleProps>;

type CircleOptions = DisplayObjectConfig<CircleStyleProps>;

/**
 * Draw circle based on BaseNode, override drawKeyShape.
 */
export class Circle extends BaseNode<CircleStyleProps, GCircle> {
  constructor(options: CircleOptions) {
    super(options);
  }

  protected getHaloStyle(attributes = this.parsedAttributes): GCircleStyleProps {
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

  protected drawKeyShape(attributes = this.parsedAttributes, container: Group): GCircle {
    return this.upsert('key', GCircle, this.getKeyStyle(attributes), container) as GCircle;
  }

  connectedCallback() {}
}
